import uvicorn
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import joblib

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Load ML Model
phish_model = open("phishing.pkl", "rb")
phish_model_ls = joblib.load(phish_model)


@app.get("/predict/{feature}")
async def predict(features):
    X_predict = []
    X_predict.append(str(features))
    y_Predict = phish_model_ls.predict(X_predict)

    if y_Predict == "bad":
        result = {
            "url": features,
            "isPhishing": True,
            "message": "This is a Phishing Site",
        }
    else:
        result = {
            "url": features,
            "isPhishing": False,
            "message": "This is not a Phishing Site",
        }

    return JSONResponse(content=result)


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
