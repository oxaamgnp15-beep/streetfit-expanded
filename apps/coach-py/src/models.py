from pydantic import BaseModel, Field
from typing import List, Literal
class PlanItem(BaseModel):
    exercise_slug: str
    type: Literal['interval','reps','emom','amrap'] = 'interval'
    sets: int = 8
    work_sec: int = 20
    rest_sec: int = 10
class PlanRequest(BaseModel):
    minutes: int = Field(ge=5, le=90)
    goal: Literal['fat-loss','strength','skill','endurance'] = 'fat-loss'
    level: Literal['beginner','intermediate','advanced'] = 'beginner'
    seed: int = 42
class PlanResponse(BaseModel):
    name: str
    items: List[PlanItem]
