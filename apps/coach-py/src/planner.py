import numpy as np
from typing import List
from .models import PlanRequest, PlanItem, PlanResponse
BLOCKS = {
  'fat-loss': ['burpee','jump-rope','mountain-climbers','air-squat','push-up','plank'],
  'strength': ['pull-up','dip','pistol-squat','pike-push-up','ring-row','glute-bridge'],
  'skill': ['handstand-hold','l-sit-pull-up','toes-to-bar','arch-hold'],
  'endurance': ['walking-lunge','wall-sit','hollow-hold','bear-crawl']
}
def make_plan(req: PlanRequest) -> PlanResponse:
    rng = np.random.default_rng(req.seed)
    pool = BLOCKS[req.goal]
    rounds = max(4, min(20, req.minutes * 60 // 30))
    items: List[PlanItem] = []
    for _ in range(rounds):
        slug = pool[rng.integers(0, len(pool))]
        items.append(PlanItem(exercise_slug=slug, sets=1, work_sec=20, rest_sec=10))
    return PlanResponse(name=f"{req.goal.title()} {req.minutes}min", items=items)
