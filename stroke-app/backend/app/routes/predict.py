from typing import Optional
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import StreamingResponse
from ..services.ml import TAB_MODEL, IMG_MODEL, combine_probs
from ..services.pdf_report import build_pdf
import json

router = APIRouter(prefix="/api", tags=["predict"]) 

# Tabular prediction
@router.post("/predict/tabular")
async def predict_tabular(body: dict):
    try:
        p = TAB_MODEL.predict_proba([body.get("features", {})])
        return {"tab_prob": float(p)}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Tabular prediction failed: {e}")

# Image prediction
@router.post("/predict/image")
async def predict_image(file: UploadFile = File(...)):
    try:
        content = await file.read()
        p = IMG_MODEL.predict_proba(content)
        return {"img_prob": float(p)}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Image prediction failed: {e}")

# Ensemble prediction (tabular + optional image)
@router.post("/predict/ensemble")
async def predict_ensemble(
    body: str = Form(...),
    file: Optional[UploadFile] = File(None)
):
    try:
        body = json.loads(body)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid JSON body: {e}")

    img_prob = 0.0
    if file is not None:
        try:
            content = await file.read()
            img_prob = float(IMG_MODEL.predict_proba(content))
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Image prediction failed: {e}")

    try:
        tab_prob = float(TAB_MODEL.predict_proba([body.get("features", {})]))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Tabular prediction failed: {e}")

    ens = combine_probs(tab_prob, img_prob)
    advice = "Likely Stroke — seek immediate care" if ens >= 0.5 else "Low risk — maintain healthy lifestyle"

    return {
        "tab_prob": tab_prob,
        "img_prob": img_prob,
        "ensemble_prob": ens,
        "threshold": 0.5,
        "advice": advice
    }

# Generate PDF report
@router.post("/report/pdf")
async def report_pdf(body: dict):
    feats = body.get("features", {})
    p_tab = float(body.get("tab_prob", 0.0))
    p_img = float(body.get("img_prob", 0.0))
    p_final = float(body.get("ensemble_prob", 0.0))
    try:
        pdf_bytes = build_pdf(feats, p_tab, p_img, p_final)
        return StreamingResponse(
            iter([pdf_bytes]),
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=stroke_report.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF generation failed: {e}")
