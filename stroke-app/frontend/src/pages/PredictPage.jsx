import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InputField from '../components/InputField';
import ImageUploader from '../components/ImageUploader';
import ResultCard from '../components/ResultCard';
import { useState } from 'react';
import { api } from '../api/client';

const FIELD_DEF = [
  ['Age','number','0-120'],
  ['Systolic_BP','number','50-200'],
  ['Diastolic_BP','number','30-120'],
  ['Cholesterol_HDL','number','20-100'],
  ['Cholesterol_LDL','number','50-200'],
  ['Average_Glucose','number','50-300'],
  ['BMI','number','10-50'],
  ['Gender','text','Male,Female'],
  ['Smoking_Status','text',''],
  ['Alcohol_Consumption','text',''],
  ['Physical_Activity','text',''],
  ['Hypertension','number','0/1'],
  ['Diabetes','number','0/1'],
  ['Heart_Disease','number','0/1'],
  ['Family_History_Stroke','number','0/1'],
  ['Work_Type','text',''],
  ['Residence_Type','text','']
];

export default function PredictPage() {
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);
  const [res, setRes] = useState(null);
  const [activeTab, setActiveTab] = useState('tabular');

  const submit = async () => {
    const formData = new FormData();
    formData.append("body", JSON.stringify({ features: form }));
    if (activeTab === 'image' && file) formData.append("file", file);
    try {
      const r = await api.post('/api/predict/ensemble', formData);
      setRes(r.data);
    } catch (err) {
      console.error(err);
      alert("Prediction failed. Check backend server.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 via-cyan-50 to-white text-black">
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-16 py-8 px-4">
        {/* Tabs */}
        <div className="flex gap-3 mb-5">
          <button
            className={`px-4 py-1 rounded-lg font-semibold text-sm shadow transition ${activeTab === 'tabular' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-black'}`}
            onClick={() => setActiveTab('tabular')}
          >
            Tabular Input
          </button>
          <button
            className={`px-4 py-1 rounded-lg font-semibold text-sm shadow transition ${activeTab === 'image' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-black'}`}
            onClick={() => setActiveTab('image')}
          >
            Image Upload
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl">
          {/* Tabular Input */}
          <div className={`flex-1 bg-white rounded-xl shadow-lg p-4 transition ${activeTab === 'tabular' ? '' : 'opacity-60 pointer-events-none'}`}>
            <h2 className="font-semibold mb-3 text-teal-700 text-lg">Tabular Input</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FIELD_DEF.map(([k, t, h]) => (
                <InputField 
                  key={k} 
                  label={k} 
                  type={t} 
                  placeholder={h} 
                  value={form[k]} 
                  onChange={(v) => setForm({ ...form, [k]: v })} 
                  textColor="text-black"
                  inputClass="text-sm py-1 px-2"
                />
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div className={`flex-1 bg-white rounded-xl shadow-lg p-4 transition ${activeTab === 'image' ? '' : 'opacity-60 pointer-events-none'}`}>
            <h2 className="font-semibold mb-3 text-teal-700 text-lg">Image Upload</h2>
            <ImageUploader onFile={setFile} small={true}/>
            {file && <p className="mt-2 text-gray-600 text-sm">Selected file: {file.name}</p>}
          </div>
        </div>

        {/* Analyze Button */}
        <button
          onClick={submit}
          className="w-full max-w-2xl mt-5 py-2 rounded-lg bg-teal-600 text-white font-semibold hover:bg-teal-700 transition text-sm"
        >
          Analyze
        </button>

        {/* Results */}
        {res && (
          <div className="flex flex-col gap-3 mt-5 w-full max-w-2xl">
            <ResultCard title="Tabular" prob={res.tab_prob} textColor="text-black"/>
            <ResultCard title="Image" prob={res.img_prob} textColor="text-black"/>
            <ResultCard title="Ensemble" prob={res.ensemble_prob} textColor="text-black"/>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
