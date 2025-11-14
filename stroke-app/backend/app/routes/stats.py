from fastapi import APIRouter

router = APIRouter(prefix="/api", tags=["stats"]) 

@router.get("/stats")
async def stats():
    return {"global_incidence": "~15 million/year (placeholder)", "india_incidence": "~1.8 million/year (placeholder)"}
