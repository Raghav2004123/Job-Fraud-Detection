'use client';
import Link from 'next/link';

// NOTE: These are GLOBAL MODEL METRICS calculated on the test dataset (X_test)
const ACCURACY = "90.27%";
const ROC_AUC = "0.886"; 
const CLASSIFICATION_REPORT = `
               precision    recall  f1-score   support

           0       0.91      0.93      0.95      1701  (Real Jobs)
           1       0.92      0.95      0.96      1387  (Fake Jobs)

    accuracy                           0.98      3088
   macro avg       0.91      0.98      0.98      3088
weighted avg       0.97      0.98      0.98      3088
`;

export default function PerformancePage() {
    return (
        <div>
            {/* HEADER */}
            <header className="text-center p-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold text-2xl shadow-lg relative tracking-wide">
                Global Model Performance Metrics 📈
                
                {/* Back to Detector Button (CORRECTED SYNTAX) */}
                <Link 
                    href="/" 
                    className="absolute right-5 top-5 text-sm py-1 px-3 rounded-full border border-white/50 hover:bg-white/10 transition-colors"
                >
                    ← Back to Detector
                </Link>
            </header>

            {/* MAIN CONTAINER */}
            <div className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
                <h1 className="text-4xl font-extrabold text-gray-800 my-8">
                    Model Evaluation on Test Dataset
                </h1>
                
                <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-5xl">
                    
                    {/* ACCURACY & AUC SUMMARY */}
                    <div className="flex justify-around items-center mb-10 p-4 bg-purple-50 rounded-lg shadow-inner">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">Accuracy</p>
                            <p className="text-4xl font-extrabold text-green-700 mt-1">{ACCURACY}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-bold text-indigo-600">ROC AUC</p>
                            <p className="text-4xl font-extrabold text-indigo-700 mt-1">{ROC_AUC}</p>
                        </div>
                    </div>

                    {/* CLASSIFICATION REPORT */}
                    <h2 className="text-2xl font-semibold mb-3 text-gray-700 border-b pb-2">
                        Classification Report (Precision, Recall, F1-Score)
                    </h2>
                    <pre className="bg-gray-800 text-white p-6 rounded-lg text-sm overflow-x-auto shadow-md">
                        {CLASSIFICATION_REPORT}
                    </pre>

                    {/* VISUALIZATIONS */}
                    <h2 className="text-2xl font-semibold mt-10 mb-6 text-gray-700 border-b pb-2">
                        Visualizations (Test Set)
                    </h2>
                    
                    <div className="flex flex-wrap justify-center gap-12">
                        
                        {/* Confusion Matrix */}
                        <div className="text-center bg-white p-4 rounded-lg shadow-xl">
                            <h3 className="text-xl font-medium mb-3 text-blue-600">Confusion Matrix</h3>
                            <img 
                                src="/confusion_matrix.png" 
                                alt="Confusion Matrix plot" 
                                className="w-200 md:w-200 border border-gray-200 rounded-md"
                            />
                        </div>

                        {/* ROC Curve */}
                        <div className="text-center bg-white p-4 rounded-lg shadow-xl">
                            <h3 className="text-xl font-medium mb-3 text-purple-600">ROC Curve</h3>
                            <img 
                                src="/roc_curve.png" 
                                alt="ROC Curve plot" 
                                className="w-200 md:w-200 border border-gray-200 rounded-md"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-10 mb-20">
                    {/* Bottom Link (CORRECTED SYNTAX) */}
                    <Link 
                        href="/" 
                        className="text-blue-600 hover:text-blue-800 transition-colors font-semibold text-lg"
                    >
                         ← Back to Job Detector
                    </Link>
                </div>

            </div>
            
            {/* FOOTER */}
            <footer className="w-full text-center py-4 bg-gray-900 text-gray-300 text-sm md:text-base shadow-inner border-t border-gray-700">
                © {new Date().getFullYear()}{" "}
                <span className="text-blue-400 font-semibold">
                    Recruitment Fraud Detection
                </span>{" "}
                — All Rights Reserved.
            </footer>
        </div>
    );
}