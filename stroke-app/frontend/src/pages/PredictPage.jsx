import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InputField from '../components/InputField';
import ImageUploader from '../components/ImageUploader';
import ResultCard from '../components/ResultCard';
import { useState } from 'react';
import { api } from '../api/client';

const FIELD_DEF = [
  ['Age', 'number', '0-120'],
  ['Systolic_BP', 'number', '50-200'],
  ['Diastolic_BP', 'number', '30-120'],
  ['Cholesterol_HDL', 'number', '20-100'],
  ['Cholesterol_LDL', 'number', '50-200'],
  ['Average_Glucose', 'number', '50-300'],
  ['BMI', 'number', '10-50'],

  ['Gender', 'select', '', ['Male', 'Female']],
  ['Smoking_Status', 'select', '', ['Never Smoked', 'Former Smoker', 'Current Smoker']],
  ['Alcohol_Consumption', 'select', '', ['Light', 'Moderate']],
  ['Physical_Activity', 'select', '', ['Active', 'Light', 'Moderate', 'Sedentary']],
  ['Hypertension', 'number', '0/1'],
  ['Diabetes', 'number', '0/1'],
  ['Heart_Disease', 'number', '0/1'],
  ['Family_History_Stroke', 'number', '0/1'],
  ['Work_Type', 'select', '', ['Private', 'Government', 'Student', 'Retired', 'Self-Employed']],
  ['Residence_Type', 'select', '', ['Urban', 'Rural']]
];

export default function PredictPage() {
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);
  const [res, setRes] = useState(null);
  const [activeTab, setActiveTab] = useState('tabular');

  const submit = async () => {
    const formData = new FormData();
    formData.append('body', JSON.stringify({ features: form }));
    if (activeTab === 'image' && file) formData.append('file', file);

    try {
      const r = await api.post('/api/predict/ensemble', formData);
      setRes(r.data);
    } catch (err) {
      console.error(err);
      alert('Prediction failed. Check backend server.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-white to-cyan-50 text-black">
      <Navbar />

      <div className="flex flex-col items-center justify-start pt-20 pb-10 px-4">
        <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 w-full max-w-3xl mb-6 border border-teal-200/20">

          {/* Tabs */}
          <div className="flex gap-3 mb-5 justify-center">
            <button
              className={`px-6 py-2 rounded-xl font-semibold text-sm shadow transition-all duration-150 border ${
                activeTab === 'tabular'
                  ? 'bg-teal-600 text-white border-teal-600 scale-105'
                  : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('tabular')}
            >
              Tabular Input
            </button>

            <button
              className={`px-6 py-2 rounded-xl font-semibold text-sm shadow transition-all duration-150 border ${
                activeTab === 'image'
                  ? 'bg-teal-600 text-white border-teal-600 scale-105'
                  : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab('image')}
            >
              Image Upload
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex flex-col md:flex-row gap-6 w-full">

            {/* Tabular Form */}
            <div
              className={`flex-1 bg-white rounded-xl border shadow p-4 transition-all ${
                activeTab === 'tabular' ? '' : 'opacity-50 pointer-events-none'
              }`}
            >
              <h2 className="font-semibold mb-4 text-teal-700 text-lg text-center">Tabular Input</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FIELD_DEF.map(([k, t, h, opts]) => (
                  <InputField
                    key={k}
                    label={k.replace(/_/g, ' ')}
                    type={t}
                    placeholder={h}
                    value={form[k]}
                    options={opts || []}
                    onChange={(v) => setForm({ ...form, [k]: v })}
                    textColor="text-black"
                    inputClass="text-sm py-1.5 px-2 rounded border border-gray-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-400"
                  />
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div
              className={`flex-1 bg-white rounded-xl border shadow p-4 transition-all ${
                activeTab === 'image' ? '' : 'opacity-50 pointer-events-none'
              }`}
            >
              <h2 className="font-semibold mb-4 text-teal-700 text-lg text-center">Image Upload</h2>

              <div className="flex flex-col items-center">
                <ImageUploader onFile={setFile} small={true} />
                {file && (
                  <p className="mt-3 text-gray-600 text-sm">
                    Selected: <span className="font-medium">{file.name}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={submit}
            className="w-full mt-6 py-2.5 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition shadow-md text-sm"
          >
            Analyze
          </button>
        </div>

        {/* Results */}
        {res && (
          <div className="flex flex-col gap-4 w-full max-w-3xl bg-white p-6 rounded-2xl shadow-xl border border-teal-200/20">
            <h3 className="text-lg font-bold text-teal-700 mb-2 text-center">Prediction Results</h3>
            <ResultCard title="Tabular" prob={res.tab_prob} textColor="text-black" />
            <ResultCard title="Image" prob={res.img_prob} textColor="text-black" />
            <ResultCard title="Ensemble" prob={res.ensemble_prob} textColor="text-black" />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
