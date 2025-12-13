import React from "react";

export default function SprayBox({ data }) {
  if (!data) return null;

  return (
    <div className="mt-6 p-5 rounded-xl shadow-xl bg-white border border-green-300">

      <h2 className="text-2xl font-bold text-green-700 mb-4">
        🌿 ऑटो स्प्रे रिकमेण्डेशन
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Disease */}
        <div className="p-4 border rounded-lg bg-green-50">
          <p className="text-sm font-semibold text-green-700">🌱 रोग</p>
          <p className="text-lg font-bold text-green-900 capitalize">{data.disease}</p>
        </div>

        {/* Spray Name */}
        <div className="p-4 border rounded-lg bg-green-50">
          <p className="text-sm font-semibold text-green-700">💊 स्प्रे का नाम</p>
          <p className="text-lg font-bold text-green-900">{data.sprayName}</p>
        </div>

        {/* Pump Size */}
        <div className="p-4 border rounded-lg bg-green-50">
          <p className="text-sm font-semibold text-green-700">🚿 पंप का साइज़</p>
          <p className="text-lg font-bold text-green-900">{data.pumpSize}</p>
        </div>

        {/* Total Pumps */}
        <div className="p-4 border rounded-lg bg-green-50">
          <p className="text-sm font-semibold text-green-700">🔢 कुल पंप</p>
          <p className="text-lg font-bold text-green-900">{data.pumpRequired}</p>
        </div>

        {/* Qty per pump */}
        <div className="p-4 border rounded-lg bg-green-50">
          <p className="text-sm font-semibold text-green-700">🧪 प्रति पंप दवा (g)</p>
          <p className="text-lg font-bold text-green-900">{data.qtyPerPump} g</p>
        </div>

        {/* Total Chemical */}
        <div className="p-4 border rounded-lg bg-green-50 md:col-span-2">
          <p className="text-sm font-semibold text-green-700">🧪 कुल दवा (g)</p>
          <p className="text-2xl font-bold text-green-800">{data.totalChemical} g</p>
        </div>

        {/* Hindi Summary */}
        {data.messageHindi && (
          <div className="p-4 border rounded-lg bg-green-100 md:col-span-2 mt-2">
            <p className="text-sm font-semibold text-green-700">🗣 किसान फ्रेंडली सारांश</p>
            <p className="text-lg font-semibold text-green-900 leading-relaxed">
              {data.messageHindi}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
