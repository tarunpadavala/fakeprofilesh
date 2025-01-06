# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.metrics import accuracy_score, classification_report


# data = pd.read_csv('./train.csv')  # Replace with your file name

# y = data['fake']
# X = data.drop(columns=['fake'])

# X = pd.get_dummies(X, drop_first=True)

# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# model = RandomForestClassifier(random_state=42)
# model.fit(X_train, y_train)

# y_pred = model.predict(X_test)


# accuracy = accuracy_score(y_test, y_pred)
# print(f"Accuracy: {accuracy * 100:.2f}%")
# print("\nClassification Report:\n")
# print(classification_report(y_test, y_pred))


# import joblib
# joblib.dump(model, 'model.pkl')




# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.metrics import accuracy_score, classification_report
# from xgboost import XGBClassifier  # Import XGBoost

# data = pd.read_csv('./train.csv')  # Replace with your file name

# y = data['fake']
# X = data.drop(columns=['fake'])

# X = pd.get_dummies(X, drop_first=True)

# X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# model = XGBClassifier(random_state=42, use_label_encoder=False, eval_metric='logloss')
# model.fit(X_train, y_train)

# y_pred = model.predict(X_test)

# accuracy = accuracy_score(y_test, y_pred)
# print(f"Accuracy: {accuracy * 100:.2f}%")
# print("\nClassification Report:\n")
# print(classification_report(y_test, y_pred))

# import joblib
# joblib.dump(model, 'xgboost_model.pkl')

# loaded_model = joblib.load('xgboost_model.pkl')
# new_data = pd.DataFrame([...])  # Replace with new input data
# predictions = loaded_model.predict(new_data)


import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import StandardScaler
from imblearn.over_sampling import SMOTE
from xgboost import XGBClassifier
import joblib
import matplotlib.pyplot as plt
from xgboost import plot_importance

data = pd.read_csv('./train.csv')

data.fillna(0, inplace=True)

y = data['fake']
X = data.drop(columns=['fake'])

X = pd.get_dummies(X, drop_first=True)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

smote = SMOTE(random_state=42)
X_train_resampled, y_train_resampled = smote.fit_resample(X_train, y_train)

param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [3, 5, 7],
    'learning_rate': [0.01, 0.1, 0.2],
    'subsample': [0.8, 1],
    'colsample_bytree': [0.8, 1],
}

grid_search = GridSearchCV(
    estimator=XGBClassifier(random_state=42, use_label_encoder=False, eval_metric='logloss'),
    param_grid=param_grid,
    scoring='accuracy',
    cv=5
)

grid_search.fit(X_train_resampled, y_train_resampled)
print("Best Parameters:", grid_search.best_params_)

model = grid_search.best_estimator_

cv_scores = cross_val_score(model, X_scaled, y, cv=5, scoring='accuracy')
print(f"Cross-Validation Accuracy: {cv_scores.mean() * 100:.2f}%")

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy * 100:.2f}%")
print("\nClassification Report:\n")
print(classification_report(y_test, y_pred))

plot_importance(model)
plt.show()

joblib.dump(model, 'xgboost_optimized_model.pkl')

