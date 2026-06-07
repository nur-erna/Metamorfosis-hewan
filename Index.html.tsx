import React, { useState, useEffect } from 'react';

// Data Glosarium
const GLOSSARY_DATA = [
  { term: 'Metamorfosis', definition: 'Proses perkembangan biologi pada hewan yang melibatkan perubahan penampilan fisik dan/atau struktur setelah kelahiran atau penetasan.' },
  { term: 'Holometabola', definition: 'Metamorfosis sempurna, yaitu perkembangan hewan yang melalui fase telur, larva, pupa, dan dewasa (imago).' },
  { term: 'Hemimetabola', definition: 'Metamorfosis tidak sempurna, perkembangan hewan yang hanya melalui fase telur, nimfa, dan dewasa (imago) tanpa fase pupa.' },
  { term: 'Larva', definition: 'Bentuk muda hewan yang perkembangannya melalui metamorfosis, seringkali memiliki bentuk dan cara hidup yang sangat berbeda dari dewasanya (misal: ulat, jentik-jentik).' },
  { term: 'Nimfa', definition: 'Bentuk muda hewan metamorfosis tidak sempurna yang secara fisik sudah menyerupai bentuk dewasanya namun berukuran lebih kecil dan organ reproduksinya belum matang.' },
  { term: 'Pupa (Kepompong)', definition: 'Fase transisi/istirahat aktif di mana tubuh larva mengalami rekonstruksi besar-besaran untuk menjadi bentuk dewasa.' },
  { term: 'Imago', definition: 'Tahap akhir atau fase dewasa dari siklus hidup serangga/hewan yang telah memiliki organ reproduksi matang dan fungsional.' },
  { term: 'Ekdisis / Molting', definition: 'Proses pergantian kulit ari pada hewan arthropoda (seperti serangga atau kepiting) selama masa pertumbuhannya.' }
];

// Data Soal Kuis
const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Manakah urutan fase perkembangan metamorfosis sempurna (Holometabola) yang paling tepat?",
    options: [
      { text: "Telur → Nimfa → Pupa → Imago", isCorrect: false },
      { text: "Telur → Larva → Pupa → Imago", isCorrect: true },
      { text: "Telur → Larva → Nimfa → Imago", isCorrect: false },
      { text: "Telur → Pupa → Larva → Imago", isCorrect: false }
    ],
    explanation: "Metamorfosis sempurna melalui 4 tahapan utama secara berurutan: Telur menetas menjadi Larva (aktif makan), berkembang menjadi Pupa (kepompong/fase transisi), dan akhirnya keluar menjadi Imago (dewasa)."
  },
  {
    id: 2,
    question: "Hewan muda yang memiliki bentuk fisik mirip dengan induknya namun berukuran lebih kecil dan belum bersayap pada metamorfosis tidak sempurna disebut...",
    options: [
      { text: "Larva", isCorrect: false },
      { text: "Pupa", isCorrect: false },
      { text: "Nimfa", isCorrect: true },
      { text: "Ulat", isCorrect: false }
    ],
    explanation: "Nimfa adalah fase muda pada metamorfosis tidak sempurna (misalnya belalang atau kecoak) yang secara struktural sudah mirip hewan dewasa, namun berukuran lebih kecil dan belum memiliki sayap serta organ reproduksi yang matang."
  },
  {
    id: 3,
    question: "Katak merupakan salah satu hewan vertebrata yang mengalami metamorfosis. Metamorfosis katak dikategorikan unik karena...",
    options: [
      { text: "Tidak melewati fase telur", isCorrect: false },
      { text: "Mengalami perubahan habitat dari air (berudu) ke darat (katak dewasa)", isCorrect: true },
      { text: "Sama sekali tidak mengubah bentuk tubuhnya", isCorrect: false },
      { text: "Melewati fase kepompong di dalam air", isCorrect: false }
    ],
    explanation: "Katak mengalami metamorfosis yang unik (amfibi) di mana terjadi transisi habitat dari air (sebagai berudu bernapas dengan insang) menuju ke darat (sebagai katak dewasa bernapas dengan paru-paru dan kulit)."
  },
  {
    id: 4,
    question: "Perbedaan mendasar antara metamorfosis sempurna dan metamorfosis tidak sempurna terletak pada ada tidaknya fase...",
    options: [
      { text: "Telur", isCorrect: false },
      { text: "Larva dan Pupa", isCorrect: true },
      { text: "Nimfa dan Imago", isCorrect: false },
      { text: "Dewasa", isCorrect: false }
    ],
    explanation: "Fase Pupa (kepompong) dan Larva yang sangat berbeda bentuk dari dewasa hanya ada pada metamorfosis sempurna. Metamorfosis tidak sempurna langsung menuju fase Nimfa tanpa melalui Pupa."
  },
  {
    id: 5,
    question: "Di bawah ini, kelompok hewan yang semuanya mengalami metamorfosis tidak sempurna adalah...",
    options: [
      { text: "Belalang, kecoak, jangkrik, capung", isCorrect: true },
      { text: "Kupu-kupu, nyamuk, lalat, lebah", isCorrect: false },
      { text: "Katak, kupu-kupu, kumbang, kecoak", isCorrect: false },
      { text: "Belalang, nyamuk, jangkrik, semut", isCorrect: false }
    ],
    explanation: "Belalang, kecoak, jangkrik, dan capung adalah contoh serangga Hemimetabola (metamorfosis tidak sempurna). Sedangkan nyamuk, kupu-kupu, lalat, lebah, dan semut mengalami metamorfosis sempurna."
  }
];

// Data Simulasi
const SIMULATION_ITEMS = {
  butterfly: {
    title: "Metamorfosis Kupu-Kupu (Sempurna)",
    correctOrder: ["Telur", "Larva (Ulat)", "Pupa (Kepompong)", "Kupu-Kupu Dewasa (Imago)"],
    stages: [
      { id: "s1", name: "Pupa (Kepompong)", icon: "🐛📦", desc: "Fase istirahat & rekonstruksi organ tubuh." },
      { id: "s2", name: "Kupu-Kupu Dewasa (Imago)", icon: "🦋", desc: "Fase reproduktif dengan sayap indah." },
      { id: "s3", name: "Telur", icon: "🥚", desc: "Fase awal diletakkan induk di balik daun." },
      { id: "s4", name: "Larva (Ulat)", icon: "🐛", desc: "Fase aktif makan dedaunan untuk tumbuh besar." }
    ]
  },
  grasshopper: {
    title: "Metamorfosis Belalang (Tidak Sempurna)",
    correctOrder: ["Telur", "Nimfa I (Tanpa Sayap)", "Nimfa II (Sayap Tumbuh)", "Belalang Dewasa (Imago)"],
    stages: [
      { id: "g1", name: "Belalang Dewasa (Imago)", icon: "🦗", desc: "Fase reproduktif dengan organ & sayap matang." },
      { id: "g2", name: "Telur", icon: "🥚🌾", desc: "Fase awal diletakkan induk di dalam tanah/pasir." },
      { id: "g3", name: "Nimfa II (Sayap Tumbuh)", icon: "🦗🌱", desc: "Nimfa berukuran lebih besar, sayap mulai tumbuh sedikit." },
      { id: "g4", name: "Nimfa I (Tanpa Sayap)", icon: "🐛👶", desc: "Belalang kecil menetas dari telur, belum memiliki sayap." }
    ]
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // home, materi, simulasi, quiz, glosarium
  const [materiSubTab, setMateriSubTab] = useState('pengantar'); // pengantar, sempurna, tidak-sempurna, perbandingan
  
  // State Simulasi
  const [simAnimal, setSimAnimal] = useState('butterfly');
  const [simList, setSimList] = useState([]);
  const [simFeedback, setSimFeedback] = useState(null); // null, 'success', 'fail'
  
  // State Kuis
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizAnswersHistory, setQuizAnswersHistory] = useState([]); // menyimpan riwayat jawaban

  // Mengacak item simulasi saat berganti hewan
  useEffect(() => {
    resetSimulation();
  }, [simAnimal]);

  const resetSimulation = () => {
    const list = [...SIMULATION_ITEMS[simAnimal].stages];
    // Acak urutan
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    setSimList(list);
    setSimFeedback(null);
  };

  const handleMoveSimItem = (index, direction) => {
    const newList = [...simList];
    if (direction === 'up' && index > 0) {
      [newList[index], newList[index - 1]] = [newList[index - 1], newList[index]];
    } else if (direction === 'down' && index < newList.length - 1) {
      [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
    }
    setSimList(newList);
  };

  const checkSimulationOrder = () => {
    const userOrder = simList.map(item => item.name);
    const correctOrder = SIMULATION_ITEMS[simAnimal].correctOrder;
    const isCorrect = JSON.stringify(userOrder) === JSON.stringify(correctOrder);
    setSimFeedback(isCorrect ? 'success' : 'fail');
  };

  // Logika Kuis
  const handleAnswerSelection = (index) => {
    if (selectedAnswer !== null) return; // tidak bisa ganti jawaban setelah memilih
    setSelectedAnswer(index);
    const isCorrect = QUIZ_QUESTIONS[quizIndex].options[index].isCorrect;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
    setQuizAnswersHistory(prev => [...prev, {
      questionId: QUIZ_QUESTIONS[quizIndex].id,
      selectedOptionIndex: index,
      isCorrect: isCorrect
    }]);
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizFinished(false);
    setQuizAnswersHistory([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      {/* HEADER / NAVIGATION */}
      <header className="bg-emerald-600 text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🦋</span>
            <div>
              <h1 className="font-bold text-xl tracking-tight">METAMORFOSIS HEWAN</h1>
              <p className="text-xs text-emerald-100 font-medium">MPI IPA - SMP Kelas VII/IX</p>
            </div>
          </div>
          <nav className="flex flex-wrap justify-center gap-1">
            <button 
              onClick={() => setActiveTab('home')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'home' ? 'bg-white text-emerald-700 shadow-sm' : 'text-white hover:bg-emerald-500'}`}
            >
              🏠 Beranda
            </button>
            <button 
              onClick={() => setActiveTab('materi')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'materi' ? 'bg-white text-emerald-700 shadow-sm' : 'text-white hover:bg-emerald-500'}`}
            >
              📖 Belajar Materi
            </button>
            <button 
              onClick={() => setActiveTab('simulasi')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'simulasi' ? 'bg-white text-emerald-700 shadow-sm' : 'text-white hover:bg-emerald-500'}`}
            >
              🧪 Lab Simulasi
            </button>
            <button 
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'quiz' ? 'bg-white text-emerald-700 shadow-sm' : 'text-white hover:bg-emerald-500'}`}
            >
              ✏️ Kuis Uji Diri
            </button>
            <button 
              onClick={() => setActiveTab('glosarium')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'glosarium' ? 'bg-white text-emerald-700 shadow-sm' : 'text-white hover:bg-emerald-500'}`}
            >
              📚 Glosarium
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6">
        
        {/* TAB 1: BERANDA */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fade-in">
            {/* Jumbotron */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-xl">
                <span className="bg-emerald-400/30 text-emerald-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Media Pembelajaran Interaktif (MPI)</span>
                <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                  Menguak Misteri Perubahan Bentuk Hewan!
                </h2>
                <p className="text-emerald-50 text-sm md:text-base">
                  Selamat datang di platform belajar interaktif metamorfosis. Di sini kamu akan memahami bagaimana ulat yang merayap lambat bisa menjelma menjadi kupu-kupu yang terbang tinggi dan indah dengan cara yang seru dan menantang!
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button 
                    onClick={() => setActiveTab('materi')} 
                    className="bg-white text-emerald-700 hover:bg-emerald-50 px-5 py-2.5 rounded-xl font-bold transition-all shadow-md flex items-center gap-2"
                  >
                    📖 Mulai Belajar
                  </button>
                  <button 
                    onClick={() => setActiveTab('simulasi')} 
                    className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md flex items-center gap-2"
                  >
                    🧪 Coba Lab Simulasi
                  </button>
                </div>
              </div>
              <div className="w-48 h-48 md:w-64 md:h-64 flex items-center justify-center bg-white/10 rounded-2xl backdrop-blur-sm shadow-inner relative overflow-hidden">
                <span className="text-8xl md:text-9xl animate-bounce">🦋</span>
                <span className="absolute text-4xl bottom-4 left-4 animate-pulse">🐛</span>
                <span className="absolute text-4xl top-4 right-4 animate-pulse">🥚</span>
              </div>
            </div>

            {/* Menu Pintasan (Card Navigation) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-2xl mb-4 text-emerald-600">📖</div>
                  <h3 className="font-bold text-lg mb-2">Materi Lengkap</h3>
                  <p className="text-slate-500 text-sm mb-4">Pelajari konsep metamorfosis sempurna dan tidak sempurna beserta perbedaannya lewat visualisasi skema yang interaktif.</p>
                </div>
                <button 
                  onClick={() => { setActiveTab('materi'); setMateriSubTab('pengantar'); }}
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-bold flex items-center gap-1 self-start group"
                >
                  Buka Materi <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-2xl mb-4 text-teal-600">🧪</div>
                  <h3 className="font-bold text-lg mb-2">Lab Simulasi</h3>
                  <p className="text-slate-500 text-sm mb-4">Uji nalarmu di laboratorium virtual dengan menyusun potongan siklus hidup hewan dari telur hingga imago.</p>
                </div>
                <button 
                  onClick={() => setActiveTab('simulasi')}
                  className="text-teal-600 hover:text-teal-700 text-sm font-bold flex items-center gap-1 self-start group"
                >
                  Masuk Lab <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-2xl mb-4 text-sky-600">✏️</div>
                  <h3 className="font-bold text-lg mb-2">Kuis Evaluasi</h3>
                  <p className="text-slate-500 text-sm mb-4">Dapatkan tantangan 5 soal IPA standar SMP untuk mengecek tingkat pemahamanmu. Raih nilai sempurna!</p>
                </div>
                <button 
                  onClick={() => setActiveTab('quiz')}
                  className="text-sky-600 hover:text-sky-700 text-sm font-bold flex items-center gap-1 self-start group"
                >
                  Mulai Kuis <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>

            {/* Target Pembelajaran */}
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
              <h3 className="font-bold text-emerald-800 mb-3 flex items-center gap-2">
                <span>🎯</span> Kompetensi Dasar & Tujuan Pembelajaran (IPA SMP)
              </h3>
              <ul className="space-y-2 text-slate-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">✔</span>
                  <span>Menganalisis sistem perkembangbiakan pada tumbuhan dan hewan serta penerapan teknologi pada sistem reproduksi hewan (KD 3.2 Kelas IX / Materi Ekologi dan Keanekaragaman Kelas VII).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">✔</span>
                  <span>Siswa dapat menjelaskan perbedaan mendasar fase metamorfosis sempurna dan metamorfosis tidak sempurna.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 mt-1">✔</span>
                  <span>Siswa dapat memberikan contoh-contoh organisme di lingkungan sekitar berdasarkan jenis metamorfosisnya.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 2: MATERI BELAJAR */}
        {activeTab === 'materi' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fade-in">
            
            {/* Sidebar Sub-Menu Materi */}
            <div className="lg:col-span-1 space-y-2">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <h4 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-3 px-2">Daftar Bahasan</h4>
                <nav className="space-y-1">
                  <button 
                    onClick={() => setMateriSubTab('pengantar')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${materiSubTab === 'pengantar' ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    🌱 <span>1. Apa itu Metamorfosis?</span>
                  </button>
                  <button 
                    onClick={() => setMateriSubTab('sempurna')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${materiSubTab === 'sempurna' ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    🦋 <span>2. Metamorfosis Sempurna</span>
                  </button>
                  <button 
                    onClick={() => setMateriSubTab('tidak-sempurna')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${materiSubTab === 'tidak-sempurna' ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    🦗 <span>3. Metamorfosis Tidak Sempurna</span>
                  </button>
                  <button 
                    onClick={() => setMateriSubTab('perbandingan')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${materiSubTab === 'perbandingan' ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    ⚖️ <span>4. Perbandingan & Tabel</span>
                  </button>
                </nav>
              </div>

              {/* Tips Belajar Card */}
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 text-xs text-amber-800 space-y-2">
                <span className="font-bold flex items-center gap-1">💡 Tips IPA SMP:</span>
                <p>Ingat istilah kuncinya: <strong>Holometabola</strong> (Sempurna - ada fase pupa/kepompong) dan <strong>Hemimetabola</strong> (Tidak Sempurna - hanya nimfa).</p>
              </div>
            </div>

            {/* Konten Utama Materi */}
            <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              
              {/* SUB TAB: PENGANTAR */}
              {materiSubTab === 'pengantar' && (
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <span className="text-emerald-600 font-bold text-sm">Bagian 1</span>
                    <h3 className="text-2xl font-bold mt-1 text-slate-800">Mengenal Metamorfosis</h3>
                  </div>
                  
                  <p className="leading-relaxed">
                    Pernahkah kamu memperhatikan mengapa ulat sutra bisa berubah menjadi ngengat yang bersayap indah? Atau bagaimana kecebong yang awalnya hidup seperti ikan beralih rupa menjadi katak pelompat di daratan? 
                  </p>

                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl border border-emerald-100">
                    <h4 className="font-bold text-emerald-900 mb-1">Definisi Metamorfosis:</h4>
                    <p className="text-slate-700 text-sm italic">
                      "Proses perkembangan biologis pada hewan setelah menetas atau lahir, yang melibatkan perubahan bentuk fisik, struktur tubuh, serta fisiologis yang sangat kontras."
                    </p>
                  </div>

                  <p className="leading-relaxed">
                    Dalam dunia serangga (Insecta), metamorfosis terjadi akibat adanya hormon perkembangan bernama <strong>ekdison</strong> dan <strong>hormon juvenil</strong>. Perubahan rupa ini membantu hewan muda menghindari kompetisi makanan dengan hewan dewasa. Misalnya, ulat memakan dedaunan sedangkan kupu-kupu menghisap nektar bunga.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="border p-4 rounded-xl hover:bg-slate-50 transition-all">
                      <h4 className="font-bold text-emerald-700 mb-2">1. Metamorfosis Sempurna</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Mengalami perubahan bentuk tubuh yang sangat drastis di setiap tahapannya. Ciri khas utamanya adalah melewati fase <strong>larva</strong> dan <strong>pupa/kepompong</strong>.
                      </p>
                    </div>
                    <div className="border p-4 rounded-xl hover:bg-slate-50 transition-all">
                      <h4 className="font-bold text-teal-700 mb-2">2. Metamorfosis Tidak Sempurna</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Bentuk tubuh hewan yang baru menetas mirip dengan bentuk dewasanya, namun ada bagian yang belum berkembang sempurna seperti sayap. Melewati fase <strong>nimfa</strong> tanpa fase pupa.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB TAB: METAMORFOSIS SEMPURNA */}
              {materiSubTab === 'sempurna' && (
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <span className="text-emerald-600 font-bold text-sm">Bagian 2</span>
                    <h3 className="text-2xl font-bold mt-1 text-slate-800">Metamorfosis Sempurna (Holometabola)</h3>
                  </div>

                  <p className="leading-relaxed">
                    Pada metamorfosis sempurna, organisme mengalami empat tahapan perkembangan hidup yang jelas berbeda. Hewan yang menetas dari telur memiliki penampilan fisik yang sangat berbeda dari induknya.
                  </p>

                  {/* Skema Siklus Interaktif */}
                  <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
                    <h4 className="text-center font-bold text-slate-700 mb-6">Alur Siklus Metamorfosis Sempurna (Contoh: Kupu-Kupu)</h4>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center relative">
                      {/* Langkah 1 */}
                      <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200">
                        <div className="text-3xl mb-2">🥚</div>
                        <h5 className="font-bold text-xs text-slate-800">1. TELUR</h5>
                        <p className="text-[10px] text-slate-500 mt-1">Diletakkan induk pada daun, biasanya dalam 3-5 hari menetas.</p>
                      </div>

                      {/* Langkah 2 */}
                      <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200">
                        <div className="text-3xl mb-2">🐛</div>
                        <h5 className="font-bold text-xs text-slate-800">2. LARVA (Ulat)</h5>
                        <p className="text-[10px] text-slate-500 mt-1">Sangat rakus makan dedaunan untuk menyimpan energi besar.</p>
                      </div>

                      {/* Langkah 3 */}
                      <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200">
                        <div className="text-3xl mb-2">📦🐛</div>
                        <h5 className="font-bold text-xs text-slate-800">3. PUPA (Kepompong)</h5>
                        <p className="text-[10px] text-slate-500 mt-1">Fase transisi pasif di mana jaringan tubuh dirombak total.</p>
                      </div>

                      {/* Langkah 4 */}
                      <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200">
                        <div className="text-3xl mb-2">🦋</div>
                        <h5 className="font-bold text-xs text-slate-800">4. IMAGO (Dewasa)</h5>
                        <p className="text-[10px] text-slate-500 mt-1">Kupu-kupu dewasa bersayap indah, siap bereproduksi.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800">Contoh Hewan Lainnya:</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="bg-slate-50 p-2.5 rounded-lg border text-sm">🦟 Nyamuk</div>
                      <div className="bg-slate-50 p-2.5 rounded-lg border text-sm">🪰 Lalat</div>
                      <div className="bg-slate-50 p-2.5 rounded-lg border text-sm">🐝 Lebah</div>
                      <div className="bg-slate-50 p-2.5 rounded-lg border text-sm">🐸 Katak (Amfibi)</div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB TAB: METAMORFOSIS TIDAK SEMPURNA */}
              {materiSubTab === 'tidak-sempurna' && (
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <span className="text-emerald-600 font-bold text-sm">Bagian 3</span>
                    <h3 className="text-2xl font-bold mt-1 text-slate-800">Metamorfosis Tidak Sempurna (Hemimetabola)</h3>
                  </div>

                  <p className="leading-relaxed">
                    Hewan yang mengalami metamorfosis tidak sempurna tidak mengalami perubahan bentuk yang ekstrim. Fase mudanya disebut dengan <strong>nimfa</strong> yang secara morfologi mirip dengan induk dewasa, hanya saja berukuran kecil dan beberapa organ seperti sayap belum berkembang sempurna.
                  </p>

                  {/* Skema Siklus Interaktif */}
                  <div className="bg-teal-50/50 p-6 rounded-2xl border border-teal-100">
                    <h4 className="text-center font-bold text-slate-700 mb-6">Alur Siklus Metamorfosis Tidak Sempurna (Contoh: Belalang)</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      {/* Langkah 1 */}
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                        <div className="text-3xl mb-2">🥚🌾</div>
                        <h5 className="font-bold text-xs text-slate-800">1. TELUR</h5>
                        <p className="text-[10px] text-slate-500 mt-1">Menetas langsung menjadi makhluk hidup kecil mirip induknya.</p>
                      </div>

                      {/* Langkah 2 */}
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                        <div className="text-3xl mb-2">🦗👶</div>
                        <h5 className="font-bold text-xs text-slate-800">2. NIMFA</h5>
                        <p className="text-[10px] text-slate-500 mt-1">Mengalami beberapa kali pergantian kulit (ekdisis/molting) seiring bertambah ukuran.</p>
                      </div>

                      {/* Langkah 3 */}
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                        <div className="text-3xl mb-2">🦗</div>
                        <h5 className="font-bold text-xs text-slate-800">3. IMAGO (Belalang Dewasa)</h5>
                        <p className="text-[10px] text-slate-500 mt-1 font-semibold text-teal-600">Sayap telah tumbuh sempurna dan siap berkembang biak.</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800">Contoh Hewan Lainnya:</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="bg-slate-50 p-2.5 rounded-lg border text-sm">🪳 Kecoak</div>
                      <div className="bg-slate-50 p-2.5 rounded-lg border text-sm">🦗 Jangkrik</div>
                      <div className="bg-slate-50 p-2.5 rounded-lg border text-sm">🛸 Capung</div>
                      <div className="bg-slate-50 p-2.5 rounded-lg border text-sm">🦟 Kepik</div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB TAB: PERBANDINGAN */}
              {materiSubTab === 'perbandingan' && (
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <span className="text-emerald-600 font-bold text-sm">Bagian 4</span>
                    <h3 className="text-2xl font-bold mt-1 text-slate-800">Analisis Komparatif Metamorfosis</h3>
                  </div>

                  <p className="leading-relaxed">
                    Untuk memudahkan memahami dan menjawab soal-soal ujian IPA SMP, mari kita pelajari poin-poin perbedaan utama di bawah ini:
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-slate-200 text-sm">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="p-3 border border-slate-200 font-bold text-slate-700">Faktor Pembeda</th>
                          <th className="p-3 border border-slate-200 font-bold text-emerald-800">Metamorfosis Sempurna (Holometabola)</th>
                          <th className="p-3 border border-slate-200 font-bold text-teal-800">Metamorfosis Tidak Sempurna (Hemimetabola)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-3 border border-slate-200 font-semibold bg-slate-50/50">Jumlah Tahapan</td>
                          <td className="p-3 border border-slate-200"><strong>4 Tahap</strong> (Telur → Larva → Pupa → Imago)</td>
                          <td className="p-3 border border-slate-200"><strong>3 Tahap</strong> (Telur → Nimfa → Imago)</td>
                        </tr>
                        <tr>
                          <td className="p-3 border border-slate-200 font-semibold bg-slate-50/50">Fase Pupa (Kepompong)</td>
                          <td className="p-3 border border-slate-200 text-emerald-600 font-semibold">Ada</td>
                          <td className="p-3 border border-slate-200 text-red-500 font-semibold">Tidak ada</td>
                        </tr>
                        <tr>
                          <td className="p-3 border border-slate-200 font-semibold bg-slate-50/50">Perubahan Bentuk Fisik</td>
                          <td className="p-3 border border-slate-200">Sangat drastis. Bentuk larva sangat berbeda dengan dewasa.</td>
                          <td className="p-3 border border-slate-200">Gradual (berangsur-angsur). Bentuk muda mirip dengan dewasa.</td>
                        </tr>
                        <tr>
                          <td className="p-3 border border-slate-200 font-semibold bg-slate-50/50">Fase Muda</td>
                          <td className="p-3 border border-slate-200">Disebut <strong>Larva</strong> (aktif makan)</td>
                          <td className="p-3 border border-slate-200">Disebut <strong>Nimfa</strong> (sudah mirip dewasa)</td>
                        </tr>
                        <tr>
                          <td className="p-3 border border-slate-200 font-semibold bg-slate-50/50">Contoh Organisme</td>
                          <td className="p-3 border border-slate-200">Kupu-kupu, lebah, kumbang, nyamuk, katak.</td>
                          <td className="p-3 border border-slate-200">Belalang, kecoak, jangkrik, capung.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-slate-400 text-xs">Selesai mempelajari materi!</span>
                    <button 
                      onClick={() => setActiveTab('simulasi')} 
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1 transition-all"
                    >
                      <span>🧪 Lanjut ke Lab Simulasi</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* TAB 3: LAB SIMULASI */}
        {activeTab === 'simulasi' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b pb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <span>🧪</span> Laboratorium Urutan Metamorfosis
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">Ujilah pengetahuanmu dengan mengurutkan siklus hidup hewan di bawah ini secara tepat.</p>
                </div>
                
                {/* Switch Pilihan Hewan */}
                <div className="flex bg-slate-100 p-1.5 rounded-xl border self-start">
                  <button 
                    onClick={() => setSimAnimal('butterfly')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${simAnimal === 'butterfly' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-600'}`}
                  >
                    🦋 Kupu-kupu
                  </button>
                  <button 
                    onClick={() => setSimAnimal('grasshopper')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${simAnimal === 'grasshopper' ? 'bg-white text-teal-800 shadow-sm' : 'text-slate-600'}`}
                  >
                    🦗 Belalang
                  </button>
                </div>
              </div>

              {/* Simulasi Area */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Petunjuk & Kolom Kontrol */}
                <div className="lg:col-span-1 space-y-4">
                  <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100 space-y-3">
                    <h4 className="font-bold text-indigo-900 text-sm flex items-center gap-2">
                      <span>📌</span> Petunjuk Misi:
                    </h4>
                    <p className="text-xs text-indigo-950 leading-relaxed">
                      Gunakan tombol panah ke atas (▲) atau ke bawah (▼) di samping setiap kartu tahapan untuk menggeser posisinya. Susunlah dari fase yang paling awal (Urutan Ke-1 / Telur) di bagian atas, hingga fase dewasa (Imago) di bagian paling bawah.
                    </p>
                    <div className="pt-2">
                      <button 
                        onClick={resetSimulation} 
                        className="w-full bg-white border border-indigo-200 hover:bg-indigo-100/50 text-indigo-700 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        🔄 Acak Ulang Urutan
                      </button>
                    </div>
                  </div>

                  {/* Tombol Check Jawaban */}
                  <div className="space-y-3">
                    <button 
                      onClick={checkSimulationOrder}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      🚀 Validasi & Cek Urutan
                    </button>

                    {/* Feedback Simulasi */}
                    {simFeedback === 'success' && (
                      <div className="bg-emerald-100 border border-emerald-300 rounded-xl p-4 text-center animate-bounce">
                        <span className="text-3xl">🎉</span>
                        <h4 className="font-bold text-emerald-900 text-sm mt-2">Hebat, Urutanmu Sempurna!</h4>
                        <p className="text-[11px] text-emerald-700 mt-1">Kamu sudah paham betul siklus hidup {SIMULATION_ITEMS[simAnimal].title}.</p>
                      </div>
                    )}

                    {simFeedback === 'fail' && (
                      <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-center">
                        <span className="text-3xl">❌</span>
                        <h4 className="font-bold text-rose-900 text-sm mt-2">Waduh, Urutannya Belum Tepat!</h4>
                        <p className="text-[11px] text-rose-700 mt-1">Coba teliti kembali fase awal penemuan kehidupan hingga fase siap terbang/melompat bebas.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Kolom Sorting Kartu */}
                <div className="lg:col-span-2 space-y-3">
                  <div className="flex items-center justify-between px-3 text-xs text-slate-400 font-bold">
                    <span>URUTAN FASE</span>
                    <span>TINDAKAN</span>
                  </div>

                  {simList.map((item, index) => (
                    <div 
                      key={item.id} 
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                        simFeedback === 'success' ? 'border-emerald-300 bg-emerald-50/30' : 'border-slate-200 bg-white hover:border-indigo-200 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {/* Badge Urutan */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm ${
                          simFeedback === 'success' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {index + 1}
                        </div>
                        {/* Icon Visual */}
                        <span className="text-3xl w-10 text-center">{item.icon}</span>
                        {/* Nama & Deskripsi */}
                        <div>
                          <h4 className="font-bold text-sm text-slate-800">{item.name}</h4>
                          <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                        </div>
                      </div>

                      {/* Tombol Panah Kontrol */}
                      <div className="flex gap-1.5">
                        <button 
                          disabled={index === 0}
                          onClick={() => handleMoveSimItem(index, 'up')}
                          className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xs transition-all"
                          title="Geser Ke Atas"
                        >
                          ▲
                        </button>
                        <button 
                          disabled={index === simList.length - 1}
                          onClick={() => handleMoveSimItem(index, 'down')}
                          className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xs transition-all"
                          title="Geser Ke Bawah"
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB 4: KUIS EVALUASI */}
        {activeTab === 'quiz' && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            
            {/* TAMPILAN JIKA BELUM SELESAI */}
            {!quizFinished ? (
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                
                {/* Header Kuis */}
                <div className="flex justify-between items-center border-b pb-4">
                  <div>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Evaluasi Mandiri</span>
                    <h3 className="font-bold text-lg mt-1 text-slate-800">Uji Pemahaman Metamorfosis</h3>
                  </div>
                  <span className="text-xs bg-slate-100 py-1 px-3 rounded-full font-bold text-slate-500">
                    Soal {quizIndex + 1} dari {QUIZ_QUESTIONS.length}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-full transition-all duration-300" 
                    style={{ width: `${((quizIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  ></div>
                </div>

                {/* Pertanyaan */}
                <div className="space-y-2">
                  <p className="text-base md:text-lg font-bold text-slate-800 leading-relaxed">
                    {QUIZ_QUESTIONS[quizIndex].question}
                  </p>
                </div>

                {/* Pilihan Ganda */}
                <div className="grid grid-cols-1 gap-3">
                  {QUIZ_QUESTIONS[quizIndex].options.map((opt, idx) => {
                    let btnClass = "border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/20";
                    let prefixIcon = "⚪";
                    
                    if (selectedAnswer !== null) {
                      if (opt.isCorrect) {
                        btnClass = "border-emerald-500 bg-emerald-50 text-emerald-800";
                        prefixIcon = "✅";
                      } else if (selectedAnswer === idx) {
                        btnClass = "border-red-400 bg-red-50 text-red-800";
                        prefixIcon = "❌";
                      } else {
                        btnClass = "opacity-50 border-slate-200";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={selectedAnswer !== null}
                        onClick={() => handleAnswerSelection(idx)}
                        className={`w-full text-left p-4 rounded-xl border font-medium text-sm transition-all flex items-start gap-3 ${btnClass}`}
                      >
                        <span className="mt-0.5">{prefixIcon}</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Pembahasan & Next Button */}
                {selectedAnswer !== null && (
                  <div className="bg-slate-50 p-4 rounded-xl border space-y-3 animate-fade-in">
                    <h4 className="font-bold text-slate-700 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <span>📖</span> Pembahasan IPA SMP:
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {QUIZ_QUESTIONS[quizIndex].explanation}
                    </p>
                    <div className="flex justify-end">
                      <button 
                        onClick={handleNextQuiz}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-5 rounded-lg text-xs flex items-center gap-1 transition-all"
                      >
                        <span>{quizIndex === QUIZ_QUESTIONS.length - 1 ? 'Selesai Kuis' : 'Soal Selanjutnya'}</span>
                        <span>→</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>
            ) : (
              /* TAMPILAN JIKA KUIS SELESAI (SERTIFIKAT DIGITAL & REVIEW) */
              <div className="space-y-6">
                
                {/* Sertifikat Kelulusan */}
                <div className="bg-white border-8 border-double border-emerald-600 p-8 rounded-3xl shadow-lg relative text-center space-y-6 overflow-hidden">
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-600/10 rounded-bl-full pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-600/10 rounded-tr-full pointer-events-none"></div>
                  
                  <span className="text-5xl">🏆</span>
                  <div className="space-y-1">
                    <h2 className="font-serif text-3xl font-bold text-emerald-800">SERTIFIKAT KELULUSAN</h2>
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Media Pembelajaran Interaktif Metamorfosis</p>
                  </div>
                  
                  <div className="border-t border-b py-4 max-w-md mx-auto space-y-2">
                    <p className="text-xs text-slate-500">Diberikan kepada Pembelajar Hebat dengan hasil:</p>
                    <p className="text-2xl font-bold text-slate-800 tracking-wide">Siswa SMP Kreatif</p>
                    <p className="text-sm font-semibold text-emerald-600">Skor Akhir Evaluasi: { (quizScore / QUIZ_QUESTIONS.length) * 100 } / 100</p>
                  </div>

                  <p className="text-xs text-slate-400 italic max-w-sm mx-auto">
                    "Telah berhasil menyelesaikan pembelajaran serta seluruh evaluasi bab metamorfosis hewan pada kurikulum IPA SMP."
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <button 
                      onClick={restartQuiz}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 px-5 rounded-xl text-xs transition-all"
                    >
                      🔄 Ulangi Kuis
                    </button>
                    <button 
                      onClick={() => setActiveTab('materi')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-5 rounded-xl text-xs transition-all"
                    >
                      📖 Ulas Materi Lagi
                    </button>
                  </div>
                </div>

                {/* Riwayat Jawaban & Review Evaluasi */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                  <h4 className="font-bold text-slate-800 text-sm border-b pb-2">Analisis & Ulasan Jawabanmu:</h4>
                  <div className="space-y-3">
                    {QUIZ_QUESTIONS.map((q, idx) => {
                      const userAns = quizAnswersHistory.find(hist => hist.questionId === q.id);
                      const isUserCorrect = userAns?.isCorrect;
                      return (
                        <div key={q.id} className="p-3.5 rounded-xl border text-xs flex gap-3 items-start">
                          <span className="text-lg">{isUserCorrect ? '✅' : '❌'}</span>
                          <div>
                            <h5 className="font-bold text-slate-800">Pertanyaan {idx + 1}: {q.question}</h5>
                            <p className="text-[11px] text-slate-500 mt-1">
                              Jawaban Kamu: <span className={isUserCorrect ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
                                {userAns ? q.options[userAns.selectedOptionIndex].text : 'Tidak dijawab'}
                              </span>
                            </p>
                            {!isUserCorrect && (
                              <p className="text-[11px] text-slate-400 mt-0.5">
                                Jawaban Benar: <span className="text-emerald-600 font-semibold">{q.options.find(opt => opt.isCorrect).text}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* TAB 5: GLOSARIUM */}
        {activeTab === 'glosarium' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="border-b pb-4 mb-4">
                <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <span>📚</span> Glosarium Istilah Penting
                </h3>
                <p className="text-slate-500 text-sm mt-1">Kumpulan kosakata sains biologi seputar metamorfosis untuk membantu belajarmu.</p>
              </div>

              {/* Grid Glosarium */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {GLOSSARY_DATA.map((item, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-xl border border-slate-150 bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all"
                  >
                    <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full mb-2">
                      IPA SMP
                    </span>
                    <h4 className="font-bold text-base text-emerald-700">{item.term}</h4>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{item.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-800 text-slate-400 text-xs py-6 border-t border-slate-700">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-2">
          <p className="font-semibold text-slate-300">© 2026 Media Pembelajaran Interaktif (MPI) Metamorfosis Hewan</p>
          <p>Dirancang sebagai media ajar interaktif untuk guru dan siswa jenjang Sekolah Menengah Pertama (SMP).</p>
        </div>
      </footer>

    </div>
  );
}