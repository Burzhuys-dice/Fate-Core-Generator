import { useState, useRef } from "react";
import { Download, ChevronRight, ChevronLeft, Plus, Trash2, HelpCircle, X } from "lucide-react";
import RulesTab from "./components/RulesTab";
import { CharacterSheetPDF } from "./components/CharacterSheetPDF";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";

export type Character = {
  name: string;
  concept: string;
  trouble: string;
  phase1_desc: string;
  aspect1: string;
  phase2_desc: string;
  aspect2: string;
  phase3_desc: string;
  aspect3: string;
  skills: Record<number, string[]>;
  stunts: { name: string; description: string }[];
};

const STANDARD_SKILLS = [
  "Атлетика", "Проникнення", "Контакти", "Ремесло", "Обман", "Водіння", 
  "Емпатія", "Бій", "Розслідування", "Знання", "Уважність", "Статура", 
  "Провокація", "Спілкування", "Ресурси", "Стрільба", "Скритність", "Воля"
];

const SKILL_DESCRIPTIONS: Record<string, string> = {
  "Атлетика": "Вимір фізичного потенціалу. Трюки Атлетики зосереджені на русі — біг, стрибки, паркур — та ухиленні від атак.",
  "Проникнення": "Знання та здатність обходити системи безпеки, чистити кишені та взагалі скоювати злочини. Трюки Проникнення дають бонуси на різних етапах скоєння злочину, від планування до виконання та втечі.",
  "Контакти": "Знання потрібних людей та зв'язків, які можуть вам допомогти. Трюки Контактів забезпечують вас готовими союзниками та інформаційною мережею, куди б ви не поїхали.",
  "Ремесло": "Здатність створювати або ламати механізми, будувати пристрої та демонструвати винахідливість у стилі Джиммі Нейтрона. Трюки Ремесла дозволяють мати під рукою потрібний пристрій, дають бонуси до створення та ламання речей, а також обґрунтовують використання Ремесла замість таких навичок, як Проникнення або Знання, за певних обставин.",
  "Обман": "Здатність переконливо та холоднокровно брехати і обманювати. Трюки Обману можуть покращити вашу здатність до певної брехні або допомогти у створенні фальшивих особистостей.",
  "Водіння": "Керування транспортом у найскладніших умовах, виконання крутих маневрів та витискання максимуму з вашого транспорту. Трюки Водіння можуть бути фірмовими маневрами, вашим власним особливим транспортом або здатністю використовувати Водіння замість таких навичок, як Проникнення або Знання, за певних обставин.",
  "Емпатія": "Здатність точно оцінювати настрій та наміри людини. Трюки Емпатії можуть бути пов'язані з оцінкою натовпу, виявленням брехні або допомогою іншим у відновленні після ментальних наслідків.",
  "Бій": "Здатність перемагати в ближньому бою, чи то зі зброєю, чи на кулаках. Трюки Бою включають фірмову зброю та особливі техніки.",
  "Розслідування": "Ретельне, обережне вивчення та розгадування таємниць. Використовуйте це, щоб зібрати докази або реконструювати місце злочину. Трюки Розслідування допомагають вам робити блискучі дедуктивні висновки або швидше збирати інформацію.",
  "Знання": "Будь-яка формальна освіта або знання, що охоплює як суто академічну підготовку, так і традиції чи надприродне. Трюки Знань зазвичай стосуються спеціалізованих галузей, таких як Медицина, або практичного застосування таємних знань, як-от створення заклинань.",
  "Уважність": "Здатність помічати деталі в моменті, бачити неприємності до того, як вони стануться, і взагалі бути спостережливим. Це контрастує з Розслідуванням, яке призначене для повільного, ретельного спостереження. Трюки Уважності загострюють ваші почуття, покращують швидкість реакції або ускладнюють можливість підкрастися до вас.",
  "Статура": "Чиста сила та витривалість. Трюки Статури дозволяють вам виконувати надлюдські подвиги сили, використовувати свою вагу в боротьбі та не звертати уваги на фізичні наслідки. Крім того, високий показник Статури дає вам більше комірок для фізичного стресу або наслідків.",
  "Провокація": "Здатність змушувати людей діяти так, як ви хочете. Це груба маніпуляція, а не позитивна взаємодія. Трюки Провокації дозволяють підштовхувати супротивників до необачних дій, викликати агресію на себе або лякати ворогів (за умови, що вони здатні відчувати страх).",
  "Спілкування": "Побудова зв'язків з іншими та співпраця. Якщо Провокація — це маніпуляція, то Спілкування — це щирість, довіра та доброзичливість. Трюки Спілкування дозволяють схиляти натовп на свій бік, покращувати стосунки або заводити контакти.",
  "Ресурси": "Доступ до матеріальних благ, а не просто гроші чи безпосередня власність. Це може відображати вашу здатність позичати у друзів або користуватися арсеналом організації. Трюки Ресурсів дозволяють використовувати Ресурси замість Спілкування або Контактів, або дають вам додаткові безкоштовні використання аспектів, коли ви платите за найкраще.",
  "Стрільба": "Усі форми дальнього бою, чи то з вогнепальною зброєю, метальними ножами, чи з луком і стрілами. Трюки Стрільби дозволяють вам робити прицільні постріли, швидко витягати зброю або завжди мати пістолет під рукою.",
  "Скритність": "Здатність залишатися непоміченим або нечутним і тікати, коли потрібно сховатися. Трюки Скритності дозволяють вам зникати на видноті, зливатися з натовпом або непомітно просуватися крізь тіні.",
  "Воля": "Ментальна стійкість, здатність долати спокусу та витримувати травми. Трюки Волі дозволяють ігнорувати ментальні наслідки, витримувати ментальну агонію дивних сил і триматися стійко проти ворогів, які вас провокують. Крім того, високий показник Волі дає вам більше комірок для ментального стресу або наслідків."
};

const emptyCharacter: Character = {
  name: "", concept: "", trouble: "", 
  phase1_desc: "", aspect1: "", 
  phase2_desc: "", aspect2: "", 
  phase3_desc: "", aspect3: "",
  skills: { 4: [""], 3: ["", ""], 2: ["", "", ""], 1: ["", "", "", ""] },
  stunts: []
};

type HelpTopic = 'concept' | 'trouble' | 'phase1' | 'phase2' | 'phase3' | 'skills' | null;

export default function App() {
  const [step, setStep] = useState(1);
  const [char, setChar] = useState<Character>(emptyCharacter);
  const [helpTopic, setHelpTopic] = useState<HelpTopic>(null);
  
  const sheetRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const getRank = (skillName: string) => {
    for (let r = 4; r >= 1; r--) {
      if (char.skills[r].includes(skillName)) return r;
    }
    return 0;
  };

  const getPhysiqueRank = () => getRank("Статура");
  const getWillRank = () => getRank("Воля");

  const getPhysicalStressBoxes = () => {
    const rank = getPhysiqueRank();
    if (rank >= 3) return 4;
    if (rank >= 1) return 3;
    return 2;
  };

  const getMentalStressBoxes = () => {
    const rank = getWillRank();
    if (rank >= 3) return 4;
    if (rank >= 1) return 3;
    return 2;
  };

  const getRefresh = () => {
    const stuntCost = Math.max(0, char.stunts.length - 3);
    return Math.max(1, 3 - stuntCost);
  };

  const generateVTTJson = () => {
    const items: any[] = [];
    
    // Stress
    items.push({
      name: "Фізичний стрес", type: "stress",
      system: { size: getPhysicalStressBoxes(), value: 0 }
    });
    items.push({
      name: "Ментальний стрес", type: "stress",
      system: { size: getMentalStressBoxes(), value: 0 }
    });

    // Consequences
    items.push({ name: "Легкий наслідок", type: "consequence", system: { label: "Легкий", value: "", icon: "2", active: false } });
    items.push({ name: "Середній наслідок", type: "consequence", system: { label: "Середній", value: "", icon: "4", active: false } });
    items.push({ name: "Серйозний наслідок", type: "consequence", system: { label: "Важкий", value: "", icon: "6", active: false } });

    // Aspects
    if (char.concept) items.push({ name: "Головна концепція", type: "aspect", system: { label: "Головна концепція", value: char.concept } });
    if (char.trouble) items.push({ name: "Проблема", type: "aspect", system: { label: "Проблема", value: char.trouble } });
    if (char.aspect1) items.push({ name: "Аспект", type: "aspect", system: { label: "Фаза 1", value: char.aspect1 } });
    if (char.aspect2) items.push({ name: "Аспект", type: "aspect", system: { label: "Фаза 2", value: char.aspect2 } });
    if (char.aspect3) items.push({ name: "Аспект", type: "aspect", system: { label: "Фаза 3", value: char.aspect3 } });

    // Skills
    STANDARD_SKILLS.forEach(skill => {
      const rank = getRank(skill);
      items.push({
        name: skill, type: "skill",
        system: { rank, description: "", options: { isMagicSkill: false } }
      });
    });

    // Stunts
    char.stunts.forEach(stunt => {
      items.push({
        name: stunt.name, type: "stunt",
        system: { description: stunt.description, collapsed: true }
      });
    });

    const json = {
      name: char.name || "Безіменний",
      type: "character",
      flags: { fatex: { templateActor: "Ua2cVIXIV1oOZTfc" } },
      system: { fatepoints: { current: "0", refresh: getRefresh().toString() } },
      items
    };

    return JSON.stringify(json, null, 2);
  };

  const downloadJSON = () => {
    const blob = new Blob([generateVTTJson()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${char.name || 'character'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDragStart = (e: React.DragEvent, skill: string, sourceRank: number | null, sourceIndex: number | null) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ skill, sourceRank, sourceIndex }));
  };

  const handleDropToSlot = (e: React.DragEvent, targetRank: number, targetIndex: number) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData("application/json"));
      const { skill, sourceRank, sourceIndex } = data;
      
      if (!skill) return;

      const newSkills = { ...char.skills };
      const targetSkill = newSkills[targetRank][targetIndex];

      if (sourceRank !== null && sourceIndex !== null) {
        newSkills[sourceRank][sourceIndex] = targetSkill;
      }

      newSkills[targetRank][targetIndex] = skill;
      setChar({ ...char, skills: newSkills });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDropToUnassigned = (e: React.DragEvent) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData("application/json"));
      const { sourceRank, sourceIndex } = data;

      if (sourceRank !== null && sourceIndex !== null) {
        const newSkills = { ...char.skills };
        newSkills[sourceRank][sourceIndex] = "";
        setChar({ ...char, skills: newSkills });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const assignedSkills = Object.values(char.skills).flat().filter(s => s !== "");
  const unassignedSkills = STANDARD_SKILLS.filter(s => !assignedSkills.includes(s));

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col font-sans relative overflow-hidden">
      <header className="p-6 md:p-8 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6 border-b border-white/10 shrink-0">
        <div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase">Fate Core<span className="text-[#4FACFE]">.</span></h1>
          <p className="text-xs uppercase tracking-widest text-white/50 mt-2 font-mono">Character Builder v3.0</p>
        </div>
        <nav className="flex gap-2 md:gap-4 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {[
            { id: 1, label: "Правила" },
            { id: 2, label: "Концепція" },
            { id: 3, label: "Фази" },
            { id: 4, label: "Навички" },
            { id: 5, label: "Трюки" },
            { id: 6, label: "Фінал" }
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`whitespace-nowrap uppercase font-bold tracking-widest text-[10px] md:text-xs px-2 md:px-4 py-2 transition-colors border-b-2 ${
                step === s.id 
                  ? "border-[#4FACFE] text-[#4FACFE]" 
                  : "border-transparent text-white/40 hover:text-white hover:border-white/20"
              }`}
            >
              <span className={`opacity-50 mr-1 ${step === s.id ? 'text-[#4FACFE]' : ''}`}>0{s.id}</span>
              {s.label}
            </button>
          ))}
        </nav>
      </header>
      
      <main className="flex-1 grid grid-cols-12 gap-0 overflow-hidden relative">
        <div className="col-span-12 md:col-span-8 p-6 md:p-10 border-r border-white/10 bg-white/5 flex flex-col overflow-y-auto relative">
          
          {/* STEP 1: RULES */}
          {step === 1 && (
            <RulesTab />
          )}

          {/* STEP 2: CONCEPT & TROUBLE */}
          {step === 2 && (
            <section className="flex-1">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight uppercase">Концепція та Проблема</h2>
              <p className="text-sm md:text-lg text-white/70 max-w-lg mb-8 italic">Опишіть хто ваш персонаж, та що робить його життя складним.</p>
              
              <div className="space-y-6 max-w-2xl">
                <div>
                  <label className="text-[10px] uppercase text-[#4FACFE] block mb-1 font-bold tracking-widest">Ім'я</label>
                  <input value={char.name} onChange={e => setChar({...char, name: e.target.value})} className="w-full bg-black border border-white/10 p-3 font-bold rounded-sm outline-none focus:border-[#4FACFE]" />
                </div>
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <label className="text-[10px] uppercase text-[#4FACFE] font-bold tracking-widest">Головна Концепція</label>
                    <button onClick={() => setHelpTopic('concept')} className="text-[#4FACFE] hover:text-white flex items-center gap-1 text-[10px] uppercase tracking-widest transition-colors">
                      <HelpCircle size={14}/> Довідка
                    </button>
                  </div>
                  <input value={char.concept} onChange={e => setChar({...char, concept: e.target.value})} className="w-full bg-black border border-white/10 p-3 font-bold rounded-sm outline-none focus:border-[#4FACFE]" />
                </div>
                <div>
                  <div className="flex justify-between items-end mb-1">
                    <label className="text-[10px] uppercase text-[#4FACFE] font-bold tracking-widest">Проблема</label>
                    <button onClick={() => setHelpTopic('trouble')} className="text-[#4FACFE] hover:text-white flex items-center gap-1 text-[10px] uppercase tracking-widest transition-colors">
                      <HelpCircle size={14}/> Довідка
                    </button>
                  </div>
                  <input value={char.trouble} onChange={e => setChar({...char, trouble: e.target.value})} className="w-full bg-black border border-white/10 p-3 font-bold rounded-sm outline-none focus:border-[#4FACFE]" />
                </div>
              </div>
            </section>
          )}

          {/* STEP 3: PHASES */}
          {step === 3 && (
            <section className="flex-1">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight uppercase">Додаткові Аспекти (Фази)</h2>
              <p className="text-sm md:text-lg text-white/70 max-w-lg mb-8 italic">Створіть ще три аспекти, описуючи минуле вашого персонажа та його зв'язки з іншими.</p>
              
              <div className="space-y-8 max-w-2xl">
                <div className="bg-white/5 p-4 border border-white/10 rounded-sm space-y-4">
                  <div className="flex justify-between items-end mb-1">
                    <label className="text-[10px] uppercase text-[#4FACFE] font-bold tracking-widest">Фаза 1: Перша пригода</label>
                    <button onClick={() => setHelpTopic('phase1')} className="text-[#4FACFE] hover:text-white flex items-center gap-1 text-[10px] uppercase tracking-widest transition-colors">
                      <HelpCircle size={14}/> Довідка
                    </button>
                  </div>
                  <textarea 
                    value={char.phase1_desc} 
                    onChange={e => setChar({...char, phase1_desc: e.target.value})} 
                    placeholder="Короткий опис вашої першої справжньої пригоди..."
                    className="w-full bg-black border border-white/10 p-3 text-sm rounded-sm outline-none focus:border-[#4FACFE] min-h-[80px]" 
                  />
                  <div>
                    <label className="text-[10px] uppercase text-white/50 block mb-1 font-bold tracking-widest">Аспект за підсумками фази 1</label>
                    <input value={char.aspect1} onChange={e => setChar({...char, aspect1: e.target.value})} className="w-full bg-black border border-white/10 p-3 font-bold rounded-sm outline-none focus:border-[#4FACFE]" />
                  </div>
                </div>

                <div className="bg-white/5 p-4 border border-white/10 rounded-sm space-y-4">
                  <div className="flex justify-between items-end mb-1">
                    <label className="text-[10px] uppercase text-[#4FACFE] font-bold tracking-widest">Фаза 2: Перетин шляхів</label>
                    <button onClick={() => setHelpTopic('phase2')} className="text-[#4FACFE] hover:text-white flex items-center gap-1 text-[10px] uppercase tracking-widest transition-colors">
                      <HelpCircle size={14}/> Довідка
                    </button>
                  </div>
                  <textarea 
                    value={char.phase2_desc} 
                    onChange={e => setChar({...char, phase2_desc: e.target.value})} 
                    placeholder="Як ви зустрілися з іншим персонажем і допомогли або завадили йому?"
                    className="w-full bg-black border border-white/10 p-3 text-sm rounded-sm outline-none focus:border-[#4FACFE] min-h-[80px]" 
                  />
                  <div>
                    <label className="text-[10px] uppercase text-white/50 block mb-1 font-bold tracking-widest">Аспект за підсумками фази 2</label>
                    <input value={char.aspect2} onChange={e => setChar({...char, aspect2: e.target.value})} className="w-full bg-black border border-white/10 p-3 font-bold rounded-sm outline-none focus:border-[#4FACFE]" />
                  </div>
                </div>

                <div className="bg-white/5 p-4 border border-white/10 rounded-sm space-y-4">
                  <div className="flex justify-between items-end mb-1">
                    <label className="text-[10px] uppercase text-[#4FACFE] font-bold tracking-widest">Фаза 3: Взаємодопомога (Знову перетин)</label>
                    <button onClick={() => setHelpTopic('phase3')} className="text-[#4FACFE] hover:text-white flex items-center gap-1 text-[10px] uppercase tracking-widest transition-colors">
                      <HelpCircle size={14}/> Довідка
                    </button>
                  </div>
                  <textarea 
                    value={char.phase3_desc} 
                    onChange={e => setChar({...char, phase3_desc: e.target.value})} 
                    placeholder="Як ви перетнулися зі ще одним персонажем гравця?"
                    className="w-full bg-black border border-white/10 p-3 text-sm rounded-sm outline-none focus:border-[#4FACFE] min-h-[80px]" 
                  />
                  <div>
                    <label className="text-[10px] uppercase text-white/50 block mb-1 font-bold tracking-widest">Аспект за підсумками фази 3</label>
                    <input value={char.aspect3} onChange={e => setChar({...char, aspect3: e.target.value})} className="w-full bg-black border border-white/10 p-3 font-bold rounded-sm outline-none focus:border-[#4FACFE]" />
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* STEP 4: SKILLS */}
          {step === 4 && (
            <section className="flex-1 flex flex-col">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight uppercase">Піраміда Навичок</h2>
              <p className="text-sm md:text-lg text-white/70 max-w-lg mb-8 italic">Розподіліть навички від +4 (найкраща) до +1 (базові). Перетягуйте їх з нижнього списку у слоти.</p>
              
              <div className="flex flex-col items-center space-y-4 mb-10 w-full max-w-3xl mx-auto">
                {[4, 3, 2, 1].map((rank) => (
                  <div key={rank} className="flex gap-2 sm:gap-4 justify-center w-full items-center">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center shrink-0">
                      <span className="text-lg sm:text-xl font-black text-[#4FACFE]">+{rank}</span>
                    </div>
                    {char.skills[rank].map((skillName, idx) => (
                      <div
                        key={idx}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDropToSlot(e, rank, idx)}
                        draggable={!!skillName}
                        onDragStart={(e) => skillName && handleDragStart(e, skillName, rank, idx)}
                        className={`w-24 sm:w-32 h-10 sm:h-12 flex items-center justify-center border-2 rounded-sm font-bold uppercase tracking-tight text-[10px] sm:text-xs md:text-sm transition-colors text-center px-1
                          ${skillName 
                            ? 'bg-[#4FACFE]/10 border-[#4FACFE] text-[#4FACFE] cursor-grab active:cursor-grabbing hover:bg-[#4FACFE]/20' 
                            : 'border-dashed border-white/20 bg-black text-white/30'
                          }`}
                      >
                        {skillName || "Порожньо"}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div 
                className="mt-auto border-t border-white/10 pt-6 min-h-[120px]"
                onDragOver={handleDragOver}
                onDrop={handleDropToUnassigned}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[10px] uppercase text-white/50 tracking-widest font-bold flex items-center gap-2">
                    Вільні Навички
                    <span className="text-[8px] font-normal lowercase bg-white/10 px-2 py-0.5 rounded-sm">перетягніть сюди щоб видалити з піраміди</span>
                  </h3>
                  <button onClick={() => setHelpTopic('skills')} className="text-[#4FACFE] hover:text-white flex items-center gap-1 text-[10px] uppercase tracking-widest transition-colors">
                    <HelpCircle size={14}/> Довідка
                  </button>
                </div>
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  {unassignedSkills.map(skill => (
                    <div
                      key={skill}
                      draggable
                      onDragStart={(e) => handleDragStart(e, skill, null, null)}
                      className="bg-white/10 border border-white/20 px-3 sm:px-4 py-2 rounded-sm font-bold uppercase tracking-tight text-[10px] sm:text-xs md:text-sm cursor-grab active:cursor-grabbing hover:bg-white/20 hover:border-white/40 transition-colors"
                    >
                      {skill}
                    </div>
                  ))}
                  {unassignedSkills.length === 0 && (
                    <span className="text-white/30 italic text-sm">Всі необхідні навички розподілено!</span>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* STEP 5: STUNTS */}
          {step === 5 && (
            <section className="flex-1 flex flex-col">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight uppercase">Трюки (Stunts)</h2>
              <p className="text-sm md:text-lg text-white/70 max-w-lg italic mb-6">Базово 3 трюки безкоштовно. Кожен наступний (до 5) зменшує Рефреш на 1.</p>

              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {char.stunts.map((stunt, idx) => (
                  <div key={idx} className="bg-black border border-white/10 p-4 flex gap-4 rounded-sm">
                    <div className="flex-1">
                      <input 
                        value={stunt.name} 
                        onChange={(e) => {
                          const newStunts = [...char.stunts];
                          newStunts[idx].name = e.target.value;
                          setChar({...char, stunts: newStunts});
                        }}
                        className="w-full bg-transparent border-b border-white/20 pb-2 mb-2 font-bold text-xl uppercase tracking-tight text-[#4FACFE] outline-none" 
                        placeholder="Назва трюку"
                      />
                      <textarea 
                        value={stunt.description}
                        onChange={(e) => {
                          const newStunts = [...char.stunts];
                          newStunts[idx].description = e.target.value;
                          setChar({...char, stunts: newStunts});
                        }}
                        className="w-full bg-transparent border-none text-sm text-white/70 outline-none resize-none h-16" 
                        placeholder="Опис трюку (+2 до навички у конкретній ситуації, тощо)"
                      />
                    </div>
                    <button 
                      onClick={() => setChar({...char, stunts: char.stunts.filter((_, i) => i !== idx)})}
                      className="text-white/30 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
                {char.stunts.length < 5 && (
                  <button 
                    onClick={() => setChar({...char, stunts: [...char.stunts, {name: "", description: ""}]})}
                    className="w-full border border-dashed border-white/20 p-6 flex flex-col items-center justify-center text-white/50 hover:bg-white/5 hover:text-white transition-colors gap-2 rounded-sm"
                  >
                    <Plus size={24} />
                    <span className="font-bold uppercase tracking-widest text-xs">Додати Трюк</span>
                  </button>
                )}
              </div>
            </section>
          )}

          {/* STEP 6: FINAL */}
          {step === 6 && (
            <section className="flex-1 flex flex-col items-center relative min-h-0 overflow-hidden">
              <div className="w-full flex justify-between items-center mb-6 shrink-0">
                <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight uppercase">Персонаж Готовий!</h2>
                  <p className="text-sm md:text-base text-white/70 italic max-w-lg mt-2">Ось ваш аркуш. Ви можете зберегти його як PDF для друку або як JSON для Foundry VTT.</p>
                </div>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={async () => {
                      if (!sheetRef.current) return;
                      setIsGeneratingPDF(true);
                      try {
                        const imgData = await toPng(sheetRef.current, { pixelRatio: 2 });
                        const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
                        pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
                        pdf.save(`${char.name || 'character'}_fate_core.pdf`);
                      } catch (err) {
                        console.error(err);
                      }
                      setIsGeneratingPDF(false);
                    }}
                    disabled={isGeneratingPDF}
                    className="bg-[#4FACFE] text-black px-6 py-3 font-bold uppercase tracking-tight hover:bg-white transition-colors text-sm rounded-sm flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Download size={18} />
                    {isGeneratingPDF ? 'Генерація...' : 'Завантажити PDF'}
                  </button>
                  <button 
                    onClick={downloadJSON}
                    className="bg-white/10 text-white px-6 py-3 font-bold uppercase tracking-tight hover:bg-white/20 transition-colors text-sm rounded-sm text-center"
                  >
                    Завантажити Foundry JSON
                  </button>
                </div>
              </div>
              
              <div className="w-full flex-1 overflow-auto bg-gray-50 border border-gray-200 rounded-sm p-4 sm:p-8 flex items-start justify-start md:justify-center shadow-inner">
                 <div className="origin-top-left md:origin-top scale-[0.4] sm:scale-[0.6] md:scale-[0.7] xl:scale-[0.8] mb-[-400px] sm:mb-[-200px] xl:mb-[-100px] transition-transform shadow-[0_0_20px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
                    <CharacterSheetPDF 
                      ref={sheetRef}
                      char={char}
                      physicalBoxes={getPhysicalStressBoxes()}
                      mentalBoxes={getMentalStressBoxes()}
                      refresh={getRefresh()}
                    />
                 </div>
              </div>
            </section>
          )}

          <footer className="flex justify-between items-center pt-8 border-t border-white/10 mt-auto shrink-0">
            <button 
              onClick={() => setStep(Math.max(1, step - 1))}
              className={`border border-white/20 px-8 py-4 font-black uppercase tracking-tighter hover:bg-white/10 transition-colors flex items-center gap-2 rounded-sm ${step === 1 ? 'invisible' : ''}`}
            >
              <ChevronLeft size={18} /> Назад
            </button>
            
            {step < 6 ? (
              <button 
                onClick={() => setStep(step + 1)}
                className="bg-white text-black px-8 py-4 font-black uppercase tracking-tighter hover:bg-[#4FACFE] transition-colors flex items-center gap-2 rounded-sm"
              >
                Далі <ChevronRight size={18} />
              </button>
            ) : null}
          </footer>

          {/* HELP OVERLAY / DRAWER */}
          {helpTopic && (
            <div 
              className="absolute top-0 right-0 h-full w-full bg-black/80 backdrop-blur-sm z-40 flex justify-end"
              onClick={() => setHelpTopic(null)}
            >
              <div 
                className="w-full md:w-[450px] bg-zinc-950 border-l border-white/10 h-full flex flex-col overflow-hidden animate-in slide-in-from-right-8 duration-200 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black shrink-0">
                  <h3 className="font-extrabold text-2xl uppercase tracking-tight text-[#4FACFE]">
                    {helpTopic === 'concept' ? 'Головна Концепція' : 
                     helpTopic === 'trouble' ? 'Проблема' :
                     helpTopic === 'phase1' ? 'Фаза 1: Перша пригода' :
                     helpTopic === 'phase2' ? 'Фаза 2: Перетин шляхів' :
                     helpTopic === 'skills' ? 'Опис Навичок' :
                     'Фаза 3: Взаємодопомога'}
                  </h3>
                  <button onClick={() => setHelpTopic(null)} className="text-white/50 hover:text-white transition-colors p-2 bg-white/5 rounded-sm">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="p-6 overflow-y-auto space-y-8 text-sm">
                  {helpTopic === 'skills' ? (
                    <div>
                      <p className="text-lg italic text-white/90 leading-relaxed mb-6">
                        Ось що означає кожна з базових навичок у Fate Core:
                      </p>
                      <ul className="space-y-4">
                        {STANDARD_SKILLS.map((skillName) => (
                          <li key={skillName} className="bg-white/5 border border-white/10 p-4 rounded-sm">
                            <h4 className="font-bold text-[#4FACFE] uppercase tracking-wider mb-2">{skillName}</h4>
                            <p className="text-white/80 leading-relaxed">{SKILL_DESCRIPTIONS[skillName] || "Опис відсутній."}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <>
                      <div>
                        <h4 className="text-[10px] uppercase text-white/50 tracking-widest font-bold mb-2">Що це таке?</h4>
                        <p className="text-lg italic text-white/90 leading-relaxed">
                          {helpTopic === 'concept' 
                            ? 'Це фраза, яка описує суть вашого персонажа, те, ким він є в глибині душі.'
                            : helpTopic === 'trouble'
                            ? 'Те, що робить життя вашого персонажа складним. Це джерело конфлікту і драми.'
                            : helpTopic === 'phase1'
                            ? 'Ваша перша справжня пригода. Напишіть короткий підсумок (1-2 речення), що сталося. Потім сформулюйте Аспект, який відображає цей досвід.'
                            : helpTopic === 'phase2'
                            ? 'Ви описуєте, як перетнулися з пригодою ІНШОГО гравця (Фазою 1 когось іншого). Як ви йому допомогли або завадили? Запишіть свій зв\'язок або урок у вигляді нового Аспекту.'
                            : 'Ви ще раз описуєте свою участь в історії, але вже в пригоді ТРЕТЬОГО гравця. Після цього формулюєте свій п\'ятий і останній Аспект персонажа.'}
                        </p>
                      </div>

                      {helpTopic !== 'phase1' && helpTopic !== 'phase2' && helpTopic !== 'phase3' && (
                        <div>
                          <h4 className="text-[10px] uppercase text-[#4FACFE] tracking-widest font-bold mb-2">Механіка гри</h4>
                          <div className="bg-[#4FACFE]/10 border border-[#4FACFE]/30 p-4 rounded-sm text-[#4FACFE] font-medium leading-relaxed">
                            {helpTopic === 'concept'
                              ? 'Аспект можна використовувати за Жетон Долі (Fate Point), щоб отримати +2 до викинутих кісток або перекинути кістки в цілому. ГМ може застосувати Аспект проти вас, щоб ускладнити вам життя та дати Жетон Долі, який можна використати в майбутньому.'
                              : 'Проблема найчастіше використовується ГМом, що принесе вам Жетони Долі, коли ви потрапляєте в халепу через свій недолік або ворогів.'}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="text-[10px] uppercase text-white/50 tracking-widest font-bold mb-2">Поради</h4>
                        <p className="text-white/70 leading-relaxed">
                          {helpTopic === 'concept'
                            ? 'Зробіть її широкою, але конкретною. Вона має містити як позитивні, так і потенційно негативні сторони, щоб її можна було використовувати.'
                            : helpTopic === 'trouble'
                            ? 'Проблема не має бути тим, що можна вирішити за одну сцену. Це постійний тягар, ворог, борг, або серйозний особистий недолік.'
                            : helpTopic === 'phase1'
                            ? 'Подумайте: Щось пішло не так? Що ви вирішили зробити? Хто став на вашому шляху? Чи ви перемогли? Аспект може стосуватися набутої репутації, знайденого союзника або особистої трансформації.'
                            : 'Ви можете: 1) Ускладнити пригоду (створити проблему, з якої інший герой потім вибрався), 2) Вирішити проблему (ви врятували ситуацію в критичний момент), 3) Або й те, і інше.'}
                        </p>
                      </div>


                  {(helpTopic === 'concept' || helpTopic === 'trouble') && (
                    <div>
                      <h4 className="text-[10px] uppercase text-white/50 tracking-widest font-bold mb-4">10 Зразків для натхнення</h4>
                      <ul className="space-y-3 font-medium">
                        {(helpTopic === 'concept' 
                          ? [
                              'Ветеран Галактичної Війни',
                              'Останній маг ордену Вогню',
                              'Кібер-ніндзя-найманець',
                              'Геніальний детектив з алкогольною залежністю',
                              'Піратський капітан корабля "Кривава Роза"',
                              'Чарівна злодійка з вищого суспільства',
                              'Заіржавілий лицар у пошуках спокути',
                              'Космічний контрабандист із золотим серцем',
                              'Шалений вчений, що випередив свій час',
                              'Найманий вбивця з кодексом честі'
                            ]
                          : [
                              'За мною полює Імперія',
                              'Не можу пройти повз того, хто потребує допомоги',
                              'Мій меч проклятий стародавнім богом',
                              'Величезний борг перед кримінальним босом',
                              'Спочатку стріляю, потім питаю',
                              'Залежність від небезпечної магії',
                              'Колишній напарник хоче моєї смерті',
                              'Алергія на правду',
                              'Занадто самовпевнений у власних силах',
                              'Технології мене ненавидять'
                            ]
                        ).map((example, i) => (
                          <li key={i} className="flex gap-3 bg-white/5 p-3 rounded-sm border border-white/5">
                            <span className="text-[#4FACFE]/50 font-mono text-xs mt-0.5 shrink-0">{String(i+1).padStart(2, '0')}</span>
                            <span className="text-white/80">{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR PREVIEW */}
        <div className="hidden md:flex col-span-4 bg-black p-8 flex-col overflow-y-auto">
          <div className="mb-8">
            <h3 className="text-[10px] uppercase tracking-widest text-white/40 mb-6 flex justify-between">
              <span>Лист Персонажа</span>
              <span className="text-[#4FACFE]">{char.name || "Безіменний"}</span>
            </h3>
            
            <div className="mb-6">
              <span className="text-[10px] uppercase text-[#4FACFE] block mb-1">Головна Концепція</span>
              <p className="text-lg font-bold leading-tight uppercase italic break-words">{char.concept || "[Порожньо]"}</p>
            </div>

            <div className="mb-6">
              <span className="text-[10px] uppercase text-[#4FACFE] block mb-1">Проблема</span>
              <p className="text-lg font-bold leading-tight uppercase italic break-words">{char.trouble || "[Порожньо]"}</p>
            </div>

            {(char.aspect1 || char.aspect2 || char.aspect3) && (
              <div className="mb-6 space-y-3">
                <span className="text-[10px] uppercase text-[#4FACFE] block mb-1">Інші Аспекти</span>
                {char.aspect1 && <p className="text-sm font-bold leading-tight uppercase italic break-words border-l-2 border-[#4FACFE] pl-2">{char.aspect1}</p>}
                {char.aspect2 && <p className="text-sm font-bold leading-tight uppercase italic break-words border-l-2 border-[#4FACFE] pl-2">{char.aspect2}</p>}
                {char.aspect3 && <p className="text-sm font-bold leading-tight uppercase italic break-words border-l-2 border-[#4FACFE] pl-2">{char.aspect3}</p>}
              </div>
            )}

            <div className="space-y-4 border-t border-white/10 pt-6">
              {[4,3,2,1].map(rank => {
                const filledSkills = char.skills[rank].filter(s => s !== "");
                return (
                  <div key={rank} className="flex flex-col">
                    <span className="text-[10px] uppercase text-white/30">+{rank} {rank===4?'Класно':rank===3?'Добре':rank===2?'Непогано':'Нормально'}</span>
                    <div className="h-[1px] w-full bg-white/10 my-1"></div>
                    {filledSkills.length > 0 ? (
                      <div className="flex gap-2 flex-wrap mt-1">
                        {filledSkills.map((s,i) => (
                          <span key={i} className="text-xs font-bold uppercase bg-white/10 px-2 py-1 rounded-sm">{s}</span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm font-mono text-white/40 italic">[Порожньо]</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-auto pt-8 border-t border-white/20">
            <div className="flex justify-between items-end mb-4">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-white/40 mb-1">Фізичний Стрес (Статура)</span>
                <div className="flex gap-2">
                  {Array.from({length: getPhysicalStressBoxes()}).map((_, i) => (
                    <div key={i} className="w-8 h-8 border border-white/50 flex items-center justify-center font-mono text-sm text-white/50 bg-white/5 rounded-sm">{i+1}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-end mb-4">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-white/40 mb-1">Ментальний Стрес (Воля)</span>
                <div className="flex gap-2">
                  {Array.from({length: getMentalStressBoxes()}).map((_, i) => (
                    <div key={i} className="w-8 h-8 border border-white/50 flex items-center justify-center font-mono text-sm text-white/50 bg-white/5 rounded-sm">{i+1}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="h-2 bg-gradient-to-r from-[#4FACFE] to-[#00F2FE] shrink-0"></div>
    </div>
  );
}
