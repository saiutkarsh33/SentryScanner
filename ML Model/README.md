# Python ML Model

This is a Python ML Model that predicts with about 97% accuracy if a URL is likely to be malicious or not.

Dataset used to train the ML Model was found from Kaggle.

More info in `phishing.ipynb`

**Set Up a Virtual Environment**:

```bash
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
```

**Install the Dependencies**:

```bash
pip install -r requirements.txt
```

**Initialize the API**:

Run the application to initialize the FastAPI app.

```bash
python prediction_app.py
```

**_Calling the API_**:

1. Make a `get` request to `http://127.0.0.1:8000/predict/{feature}`

eg:

```bash
const key = "features"; // dont change this!
const value = "freeairdropnotscam.com";

// query parameters
const baseUrl = "http://127.0.0.1:8000/predict/{feature}";

const url = `${baseUrl}?${key}=${encodeURIComponent(value}`;
```

---

2. Head over to `http://127.0.0.1:8000/docs#/default/predict_predict__feature__get`

- Click "Try it out"
- Input URL under description and click "execute"
- Look under "Response Body" for result

eg:

```
{
  "url": "google.com",
  "isPhishing": false,
  "message": "This is not a Phishing Site"
}
```
