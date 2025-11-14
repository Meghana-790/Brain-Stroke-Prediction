from fastapi import FastAPI
from fastapi.responses import RedirectResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from .routes.auth import router as auth_router
from .routes.predict import router as predict_router
from .routes.stats import router as stats_router

app = FastAPI(title="Stroke Prediction API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

@app.get("/api/health")
async def health():
    return {"status": "ok"}

@app.get("/")
async def root():
    # Redirect to API docs for convenience
    return RedirectResponse(url="/docs")

app.include_router(auth_router)
app.include_router(predict_router)
app.include_router(stats_router)
