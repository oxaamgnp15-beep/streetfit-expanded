from fastapi import FastAPI, HTTPException
from .models import PlanRequest
from .planner import make_plan
from .intent import parse_intent
app = FastAPI(title='StreetFit Coach', version='0.1.0')
@app.post('/v1/coach/plan')
def plan(req: PlanRequest):
    return make_plan(req)
@app.post('/v1/coach/intent')
def intent(body: dict):
    text = body.get('text','')
    pr = parse_intent(text)
    if not pr: raise HTTPException(400, 'Could not parse intent')
    return make_plan(pr)
@app.get('/v1/coach/faq')
def faq():
    return {"items": [{"q":"What is Tabata?","a":"A protocol of 20s work, 10s rest, for 8 rounds."}]}
