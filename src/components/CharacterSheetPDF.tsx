import React from 'react';
import { Character } from '../App';

type Props = {
  char: Character;
  physicalBoxes: number;
  mentalBoxes: number;
  refresh: number;
};

export const CharacterSheetPDF = React.forwardRef<HTMLDivElement, Props>(({ char, physicalBoxes, mentalBoxes, refresh }, ref) => {
  return (
    <div ref={ref} className="bg-[#ffffff] text-[#000000] font-sans p-8 w-[1122px] h-[793px] box-border relative flex flex-col mx-auto shrink-0 ">
      
      {/* HEADER SECTION */}
      <div className="flex justify-between items-start mb-6">
        
        {/* ID Block */}
        <div className="flex-1 mr-8">
          <div className="bg-[#000000] text-[#ffffff] px-3 py-1 font-extrabold uppercase tracking-widest text-lg">
            ІДЕНТИФІКАЦІЯ (ID)
          </div>
          <div className="border-x border-b border-[#000000] p-4 flex flex-col gap-3 h-[130px]">
             <div className="flex items-end border-b border-[#d1d5db] pb-1">
               <span className="text-xs font-bold uppercase text-[#6b7280] w-24 shrink-0">Ім'я (Name)</span>
               <span className="font-bold text-xl leading-none text-[#000000] break-words">{char.name}</span>
             </div>
             <div className="flex items-end border-b border-[#d1d5db] pb-1 flex-1">
               <span className="text-xs font-bold uppercase text-[#6b7280] w-24 shrink-0">Опис</span>
               <span className="text-base text-[#000000] break-words line-clamp-2">{char.concept}</span>
             </div>
          </div>
        </div>

        {/* Logo and Circles */}
        <div className="flex items-center gap-8 shrink-0">
          <div className="relative w-[140px] h-[130px]">
             {/* Refresh Circle */}
             <div className="absolute bottom-0 right-0 w-[100px] h-[100px] rounded-full border-[3px] border-[#000000] flex flex-col items-center justify-center bg-[#ffffff] z-0">
               <span className="text-3xl font-black">{refresh}</span>
               <span className="text-[10px] font-bold uppercase text-[#9ca3af]">Рефреш</span>
             </div>
             {/* Current Fate Circle */}
             <div className="absolute top-0 left-0 w-[90px] h-[90px] rounded-full border-[3px] border-[#000000] flex items-center justify-center bg-[#ffffff] z-10 ">
               <span className="text-[10px] font-bold uppercase text-[#9ca3af] text-center leading-tight">Поточні<br/>Жетони</span>
             </div>
          </div>

          <div className="flex flex-col items-end justify-center">
            <div className="text-[100px] font-black tracking-tighter leading-[0.8] mb-1">FATE</div>
            <div className="text-2xl font-bold tracking-[0.3em] uppercase">Core System</div>
          </div>
        </div>

      </div>

      {/* TWO COLUMNS LAYOUT */}
      <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-6">
          
          {/* ASPECTS */}
          <div className="flex-1 flex flex-col">
            <div className="bg-[#000000] text-[#ffffff] px-3 py-1 font-extrabold uppercase tracking-widest">
              Аспекти (Aspects)
            </div>
            <div className="border-x border-b border-[#000000] p-4 flex-1 flex flex-col gap-5">
               <div>
                 <div className="text-[10px] font-bold uppercase text-[#9ca3af] mb-1">Головна Концепція (High Concept)</div>
                 <div className="font-bold text-xl border-b border-[#d1d5db] pb-1 min-h-[32px] break-words">{char.concept}</div>
               </div>
               <div>
                 <div className="text-[10px] font-bold uppercase text-[#9ca3af] mb-1">Проблема (Trouble)</div>
                 <div className="font-bold text-xl border-b border-[#d1d5db] pb-1 min-h-[32px] break-words">{char.trouble}</div>
               </div>
               <div className="flex-1">
                 <div className="text-[10px] font-bold uppercase text-[#9ca3af] mb-1">Інші Аспекти (Other Aspects)</div>
                 <div className="space-y-5">
                   <div className="font-bold text-xl border-b border-[#d1d5db] pb-1 min-h-[32px] break-words">{char.aspect1}</div>
                   <div className="font-bold text-xl border-b border-[#d1d5db] pb-1 min-h-[32px] break-words">{char.aspect2}</div>
                   <div className="font-bold text-xl border-b border-[#d1d5db] pb-1 min-h-[32px] break-words">{char.aspect3}</div>
                 </div>
               </div>
            </div>
          </div>

          {/* STRESS AND CONSEQUENCES */}
          <div className="flex flex-col shrink-0">
            <div className="bg-[#000000] text-[#ffffff] px-3 py-1 font-extrabold uppercase tracking-widest">
              Стрес та Наслідки (Stress and Consequences)
            </div>
            <div className="border-x border-b border-[#000000] p-4 flex-1 flex flex-col">
              
              <div className="flex justify-between mb-4">
                {/* Physical Stress */}
                <div className="flex flex-col">
                  <div className="text-[10px] font-bold uppercase text-[#6b7280] mb-1">Фізичний Стрес (Статура)</div>
                  <div className="flex gap-2">
                    {[1,2,3,4].map(num => (
                      <div key={`phys-${num}`} className={`w-8 h-8 border-[2px] border-[#000000] flex items-center justify-center font-bold text-lg ${num > physicalBoxes ? 'opacity-20 bg-[#f3f4f6]' : 'bg-[#ffffff]'}`}>
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
                {/* Mental Stress */}
                <div className="flex flex-col items-end">
                  <div className="text-[10px] font-bold uppercase text-[#6b7280] mb-1">Ментальний Стрес (Воля)</div>
                  <div className="flex gap-2">
                    {[1,2,3,4].map(num => (
                      <div key={`ment-${num}`} className={`w-8 h-8 border-[2px] border-[#000000] flex items-center justify-center font-bold text-lg ${num > mentalBoxes ? 'opacity-20 bg-[#f3f4f6]' : 'bg-[#ffffff]'}`}>
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Consequences */}
              <div className="flex-1 flex flex-col justify-between">
                 <div className="flex items-center gap-3 border-b border-[#d1d5db] pb-1">
                   <div className="w-8 h-8 border-[2px] border-[#000000] flex items-center justify-center font-bold text-lg shrink-0">2</div>
                   <div className="text-[10px] font-bold uppercase text-[#9ca3af] w-16">М'який</div>
                   <div className="flex-1"></div>
                 </div>
                 <div className="flex items-center gap-3 border-b border-[#d1d5db] pb-1">
                   <div className="w-8 h-8 border-[2px] border-[#000000] flex items-center justify-center font-bold text-lg shrink-0">4</div>
                   <div className="text-[10px] font-bold uppercase text-[#9ca3af] w-16">Середній</div>
                   <div className="flex-1"></div>
                 </div>
                 <div className="flex items-center gap-3 border-b border-[#d1d5db] pb-1">
                   <div className="w-8 h-8 border-[2px] border-[#000000] flex items-center justify-center font-bold text-lg shrink-0">6</div>
                   <div className="text-[10px] font-bold uppercase text-[#9ca3af] w-16">Важкий</div>
                   <div className="flex-1"></div>
                 </div>
                 <div className="flex items-center gap-3 border-b border-[#d1d5db] pb-1 opacity-50">
                   <div className="w-8 h-8 border-[2px] border-[#000000] flex items-center justify-center font-bold text-lg shrink-0">2</div>
                   <div className="text-[10px] font-bold uppercase text-[#9ca3af] w-16">М'який</div>
                   <div className="flex-1"></div>
                 </div>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6">
          
          {/* SKILLS */}
          <div className="flex flex-col shrink-0">
            <div className="bg-[#000000] text-[#ffffff] px-3 py-1 font-extrabold uppercase tracking-widest">
              Навички (Skills)
            </div>
            <div className="border-x border-b border-[#000000] p-4 flex-1 flex flex-col justify-between">
               {[
                 { rank: 4, label: "Класно (+4):" },
                 { rank: 3, label: "Добре (+3):" },
                 { rank: 2, label: "Непогано (+2):" },
                 { rank: 1, label: "Нормально (+1):" },
               ].map((level) => {
                 const currentSkills = char.skills[level.rank] ? char.skills[level.rank].filter(Boolean).join(", ") : "";
                 return (
                   <div key={level.rank} className="flex border-b border-[#d1d5db] pb-1 items-end min-h-[36px]">
                     <div className="text-[15px] font-bold w-[120px] shrink-0">{level.label}</div>
                     <div className="font-bold text-lg leading-none uppercase text-[#000000] break-words flex-1 text-center">{currentSkills}</div>
                   </div>
                 )
               })}
            </div>
          </div>

          {/* STUNTS AND EXTRAS */}
          <div className="flex-1 flex flex-col">
            <div className="bg-[#000000] text-[#ffffff] px-3 py-1 font-extrabold uppercase tracking-widest">
              Трюки та Додаткове (Stunts and Extras)
            </div>
            <div className="border-x border-b border-[#000000] p-4 flex-1">
               <ul className="space-y-4">
                 {char.stunts.map((stunt, idx) => (
                   <li key={idx} className="text-[15px] leading-tight text-justify">
                     <strong className="uppercase mr-2 text-[#000000]">{stunt.name}:</strong>
                     <span className="text-[#1f2937]">{stunt.description}</span>
                   </li>
                 ))}
               </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
});

CharacterSheetPDF.displayName = "CharacterSheetPDF";
