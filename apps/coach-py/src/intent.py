import re
from typing import Optional
from .models import PlanRequest
PATTERN = re.compile(r"/(tabata)\s+(\d+)/(\d+)\s*x\s*(\d+)")
def parse_intent(text: str) -> Optional[PlanRequest]:
    m = PATTERN.search(text.lower())
    if not m: return None
    work, rest, sets = int(m.group(2)), int(m.group(3)), int(m.group(4))
    minutes = max(5, (work+rest)*sets // 60)
    return PlanRequest(minutes=minutes, goal='fat-loss', level='beginner')
