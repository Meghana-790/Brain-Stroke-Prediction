import joblib
import torch
from torchvision import transforms, models
from PIL import Image
import numpy as np
import os
import pandas as pd
from io import BytesIO
import xgboost as xgb

# Paths to real models
# Prefer using the copies under stroke-app/models for portability; Booster JSON lives under the root models/xg_boost
XGB_PIPELINE_PATH = r"C:\Users\mumma\OneDrive\Desktop\stroke-app\stroke-app\models\preprocessor.joblib"
XGB_JSON_PATH = r"C:\Users\mumma\OneDrive\Desktop\stroke-app\stroke-app\models\xgb_stroke.json"
EFFNET_PATH = r"C:\Users\mumma\OneDrive\Desktop\stroke-app\stroke-app\models\effnet_b0_sz224_bs24_20251001_165346_best.pth"
# Tabular model loader
class TabularModel:
    def __init__(self):
        # Attempt to load a full sklearn Pipeline; if it's only a preprocessor, fall back to Booster JSON
        obj = joblib.load(XGB_PIPELINE_PATH)
        # If the loaded object has predict_proba, treat it as a full pipeline
        if hasattr(obj, "predict_proba"):
            self.pipeline = obj
            self.preprocessor = None
            self.booster = None
        else:
            # Assume it's a fitted preprocessor (e.g., ColumnTransformer)
            self.pipeline = None
            self.preprocessor = obj
            booster = xgb.Booster()
            booster.load_model(XGB_JSON_PATH)
            self.booster = booster

    def predict_proba(self, rows: list[dict]) -> float:
        try:
            X_df = pd.DataFrame(rows)
            print("Input columns:", X_df.columns.tolist())
            print("Expected columns:", self.preprocessor.feature_names_in_)
            X_trans = self.preprocessor.transform(X_df)
            feature_names = self.preprocessor.get_feature_names_out().tolist()  # Convert numpy array to list
            X_proc_df = pd.DataFrame(X_trans, columns=feature_names)
            X_proc_df.columns = [col.split("__")[-1] for col in X_proc_df.columns]
            X_proc_df = X_proc_df.astype(float)  # Convert all columns to float
            print("Processed DataFrame dtypes after:", X_proc_df.dtypes)
            dm = xgb.DMatrix(X_proc_df, feature_names=X_proc_df.columns.tolist())
            prob = self.booster.predict(dm)[0]
            return float(prob)
        except Exception as e:
            print("TabularModel.predict_proba ERROR:", e)
            raise
# Image model loader
class ImageModel:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model = models.efficientnet_b0(weights=None)  # use weights=None for no pretraining
        # Change classifier head to match your checkpoint (2 output classes)
        self.model.classifier[1] = torch.nn.Linear(self.model.classifier[1].in_features, 2)
        checkpoint = torch.load(EFFNET_PATH, map_location=self.device)
        # Support multiple checkpoint formats
        state_dict = None
        if isinstance(checkpoint, dict):
            state_dict = checkpoint.get("model_state") or checkpoint.get("state_dict")
        if state_dict is None:
            # Assume checkpoint itself is a state_dict
            state_dict = checkpoint
        self.model.load_state_dict(state_dict)
        self.model.eval()
        self.model.to(self.device)
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
        ])
    def predict_proba(self, img_bytes):
        print("ImageModel.predict_proba called")
        img = Image.open(BytesIO(img_bytes)).convert("RGB")
        x = self.transform(img).unsqueeze(0).to(self.device)
        with torch.no_grad():
            logits = self.model(x)
            print("Logits:", logits)
            proba = torch.softmax(logits, dim=1).cpu().numpy()
            print("Probabilities:", proba)
        return proba[0, 1]  # Assuming class 1 is 'stroke'

TAB_MODEL = TabularModel()
IMG_MODEL = ImageModel()

def combine_probs(p_tab: float, p_img: float, w_tab: float = 0.6, w_img: float = 0.4) -> float:
    s = max(1e-9, w_tab + w_img)
    return (w_tab * p_tab + w_img * p_img) / s