import { BookOpen, Dices, Crosshair, Shield, Zap, RefreshCw, AlertCircle, Star } from "lucide-react";

export default function RulesTab() {
  return (
    <section className="flex-1 space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight uppercase">Довідник Правил Fate Core</h2>
        <p className="text-sm md:text-lg text-white/70 italic">Все, що потрібно знати для гри, на одній сторінці.</p>
      </div>

      <div className="space-y-8">
        
        {/* SECTION 1 */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="text-[#4FACFE]" size={24} />
            <h3 className="text-xl font-bold uppercase tracking-widest text-[#4FACFE]">Що таке настільна рольова гра?</h3>
          </div>
          <p className="text-white/80 leading-relaxed">
            Це гра, де група друзів збирається разом, щоб розповісти інтерактивну історію. Ви створюєте персонажів і вирішуєте, що вони кажуть та роблять у різних викликах. Один гравець стає <strong>Майстром Гри (ГМ)</strong> — він відповідає за світ, інших персонажів (NPC) та створює ситуації. Інші — керують своїми героями.
          </p>
        </div>

        {/* SECTION 2 */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="text-[#4FACFE]" size={24} />
            <h3 className="text-xl font-bold uppercase tracking-widest text-[#4FACFE]">Основні Концепції Fate</h3>
          </div>
          <p className="text-white/80 leading-relaxed mb-4">
            Fate найкраще працює з іграми, де герої — <strong>проактивні, компетентні та мають драматичне життя</strong>. Вони не чекають на пригоди, а самі їх шукають. Вони круті спеціалісти, але їхнє життя сповнене складних виборів і проблем.
          </p>
          <div className="bg-black/50 p-4 border-l-2 border-[#4FACFE]">
            <h4 className="font-bold uppercase text-sm text-white/50 mb-1">Золоте Правило Fate</h4>
            <p className="font-medium text-white/90">Спочатку вирішіть, <em>що</em> ви намагаєтесь зробити в історії, а вже потім шукайте правила, які допоможуть це змоделювати. Історія завжди на першому місці!</p>
          </div>
        </div>

        {/* SECTION 3 */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
          <div className="flex items-center gap-3 mb-4">
            <Dices className="text-[#4FACFE]" size={24} />
            <h3 className="text-xl font-bold uppercase tracking-widest text-[#4FACFE]">Кидки Кісток та Результати</h3>
          </div>
          <p className="text-white/80 leading-relaxed mb-4">
            Ви кидаєте кістки, коли між вами і вашою метою є цікава перепона. Використовуються 4 спеціальні кістки Fate (грані: +, -, 0). 
            <br />
            <strong>Формула:</strong> Результат кісток + Рівень Навички = Ваш підсумковий результат.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-black p-4 rounded-sm border border-white/5">
              <span className="text-red-400 font-bold uppercase block mb-1">Провал (Fail)</span>
              <p className="text-sm text-white/70">Результат менший за опір. Ви або не досягаєте мети, або досягаєте її, але з дуже <em>серйозними наслідками/ціною</em>.</p>
            </div>
            <div className="bg-black p-4 rounded-sm border border-white/5">
              <span className="text-yellow-400 font-bold uppercase block mb-1">Нічия (Tie / 0 Зрушень)</span>
              <p className="text-sm text-white/70">Результат дорівнює опору. Ви досягаєте мети, але з <em>незначною ціною</em>, або отримуєте частковий успіх.</p>
            </div>
            <div className="bg-black p-4 rounded-sm border border-white/5">
              <span className="text-green-400 font-bold uppercase block mb-1">Успіх (Succeed / 1-2 Зрушення)</span>
              <p className="text-sm text-white/70">Результат більший на 1-2. Ви досягаєте своєї мети без жодної ціни та наслідків.</p>
            </div>
            <div className="bg-[#4FACFE]/10 p-4 rounded-sm border border-[#4FACFE]/30">
              <span className="text-[#4FACFE] font-bold uppercase block mb-1">Успіх зі Стилем (3+ Зрушень)</span>
              <p className="text-sm text-white/90">Ви перевершуєте опір на 3 або більше. Ви отримуєте те, що хотіли, і додаткову вигоду (Boost).</p>
            </div>
          </div>
        </div>

        {/* SECTION 4 */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
          <div className="flex items-center gap-3 mb-4">
            <Crosshair className="text-[#4FACFE]" size={24} />
            <h3 className="text-xl font-bold uppercase tracking-widest text-[#4FACFE]">Чотири Дії</h3>
          </div>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center border border-[#4FACFE] shrink-0 font-bold text-[#4FACFE]">1</div>
              <div>
                <strong className="block text-lg">Здолати Перепону (Overcome)</strong>
                <span className="text-white/70">Пройти фізичну або розумову перешкоду, зламати замок, втекти, розшифрувати текст.</span>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center border border-[#4FACFE] shrink-0 font-bold text-[#4FACFE]">2</div>
              <div>
                <strong className="block text-lg">Створити Перевагу (Create an Advantage)</strong>
                <span className="text-white/70">Створити новий Аспект на сцені або супротивнику (наприклад, "Пісок в очі" або "Висока позиція"), щоб потім отримати безкоштовне використання цього аспекту.</span>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center border border-[#4FACFE] shrink-0 font-bold text-[#4FACFE]">3</div>
              <div>
                <strong className="block text-lg">Атакувати (Attack)</strong>
                <span className="text-white/70">Спроба завдати шкоди в конфлікті. Фізично або ментально. Завдає Стресу або Наслідків.</span>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center border border-[#4FACFE] shrink-0 font-bold text-[#4FACFE]">4</div>
              <div>
                <strong className="block text-lg">Захиститися (Defend)</strong>
                <span className="text-white/70">Реакція на Атаку або спробу Створити Перевагу проти вас. Успішний захист зі стилем дає вам Перевагу.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* SECTION 5 */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="text-[#4FACFE]" size={24} />
            <h3 className="text-xl font-bold uppercase tracking-widest text-[#4FACFE]">Аспекти та Жетони Долі (Fate Points)</h3>
          </div>
          <p className="text-white/80 leading-relaxed mb-6">
            <strong>Аспект</strong> — це фраза, яка описує щось унікальне або важливе про персонажа, сцену чи предмет. Вони дозволяють змінювати історію за допомогою <strong>Жетонів Долі</strong>.
            На початку кожної ігрової сесії ви отримуєте Жетони Долі в кількості вашого <strong>Рефрешу</strong> (зазвичай 3).
          </p>
          
          <h4 className="font-bold text-white mb-3 border-b border-white/10 pb-2">Як отримати Жетони Долі?</h4>
          <ul className="list-disc list-inside text-sm text-white/80 space-y-2 mb-6 ml-2">
            <li><strong>Ускладнення (Compel):</strong> Ваш Аспект створює вам проблеми в історії. ГМ пропонує вам жетон, або ви самі напрошуєтесь на неприємності.</li>
            <li><strong>Здача (Concession):</strong> Ви добровільно програєте конфлікт, щоб уникнути гірших наслідків. За це ви отримуєте 1 жетон + по 1 жетону за кожен отриманий Наслідок.</li>
            <li><strong>Вороже використання:</strong> Якщо хтось витрачає Жетон Долі, щоб використати ваш Аспект проти вас, ви отримуєте цей жетон в кінці сцени.</li>
          </ul>

          <h4 className="font-bold text-white mb-3 border-b border-white/10 pb-2">Як витратити Жетони Долі?</h4>
          <ul className="list-disc list-inside text-sm text-white/80 space-y-2 ml-2">
            <li><strong>Використання Аспекту (Invoke):</strong> Витратьте 1 жетон, щоб отримати <strong>+2</strong> до кидка або <strong>перекинути</strong> всі кістки. Ви повинні пояснити, як Аспект допомагає вам.</li>
            <li><strong>Декларування деталі:</strong> Витратьте жетон, щоб додати зручну деталь в історію (наприклад, "Якраз маю потрібний інструмент").</li>
            <li><strong>Відмова від ускладнення:</strong> Якщо ГМ пропонує ускладнення, а ви не хочете його приймати, ви мусите заплатити 1 жетон зі свого запасу.</li>
            <li><strong>Активація сильних трюків:</strong> Деякі потужні трюки потребують Жетону Долі для активації.</li>
          </ul>
        </div>

        {/* SECTION 6 */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-[#4FACFE]" size={24} />
            <h3 className="text-xl font-bold uppercase tracking-widest text-[#4FACFE]">Стрес та Наслідки</h3>
          </div>
          <div className="space-y-4 text-white/80">
            <p>
              <strong>Стрес (Stress)</strong>: Це ваша витривалість в бою або суперечці. Це не рани, а скоріше ваша здатність ухилятися в останню мить. Стрес повністю зникає в кінці кожної сцени конфлікту.
            </p>
            <p>
              <strong>Наслідки (Consequences)</strong>: Якщо ви отримуєте сильний удар і не маєте Стресу (або не хочете його витрачати), ви отримуєте Наслідок (М'який, Середній або Важкий). Це новий тимчасовий Аспект на вашому персонажі (наприклад, "Розбитий ніс" або "Вивихнута рука"), який вороги можуть безкоштовно використати проти вас 1 раз. Наслідки лікуються значно довше.
            </p>
          </div>
        </div>

        {/* SECTION 7 */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-sm">
          <div className="flex items-center gap-3 mb-4">
            <Star className="text-[#4FACFE]" size={24} />
            <h3 className="text-xl font-bold uppercase tracking-widest text-[#4FACFE]">Трюки (Stunts)</h3>
          </div>
          <p className="text-white/80 leading-relaxed mb-4">
            <strong>Трюки</strong> — це спеціальні прийоми або особливі таланти вашого персонажа, які дозволяють змінювати правила гри на вашу користь у вузьких специфічних ситуаціях. На відміну від Аспектів, трюки зазвичай працюють безкоштовно.
          </p>
          <ul className="list-disc list-inside text-sm text-white/80 space-y-2 ml-2">
            <li><strong>Нова дія:</strong> Дозволяє використовувати навичку для того, що вона зазвичай не робить (наприклад, використовувати Скритність для фізичної атаки).</li>
            <li><strong>Бонус +2:</strong> Дає постійний бонус +2 до певної дії з певною навичкою у чітко визначеній ситуації (наприклад, +2 до Спілкування під час торгівлі).</li>
            <li><strong>Виняток з правил:</strong> Дозволяє порушити базові правила гри (наприклад, замінити одну навичку на іншу).</li>
          </ul>
          <div className="bg-black/50 p-4 border-l-2 border-[#4FACFE] mt-4 flex gap-3 items-start">
            <RefreshCw size={18} className="text-[#4FACFE] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-white/50 mb-1">Рефреш та Трюки</h4>
              <p className="text-sm text-white/90">Базово кожен персонаж має <strong>3 безкоштовні трюки</strong>. Ви можете взяти до двох додаткових трюків (разом 5), але кожен з них зменшить ваш рівень Рефрешу (стартову кількість Жетонів Долі) на 1. Рефреш ніколи не може бути меншим за 1.</p>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="font-bold text-white mb-4 border-b border-white/10 pb-2">10 Прикладів Трюків для натхнення</h4>
            <ul className="space-y-3 font-medium text-sm text-white/80">
              <li className="bg-white/5 p-3 rounded-sm border border-white/5">
                <strong className="text-[#4FACFE]">Удар у спину (Скритність):</strong> Ви можете використовувати Скритність для фізичних атак, якщо ціль ще не знає про вашу присутність.
              </li>
              <li className="bg-white/5 p-3 rounded-sm border border-white/5">
                <strong className="text-[#4FACFE]">Відчуття небезпеки (Уважність):</strong> Ваша Уважність працює без штрафів у темряві або при приховуванні цілі, якщо хтось має намір завдати вам шкоди.
              </li>
              <li className="bg-white/5 p-3 rounded-sm border border-white/5">
                <strong className="text-[#4FACFE]">Паркурник (Атлетика):</strong> Отримайте +2 до спроб Здолати Перепону за допомогою Атлетики під час погоні по дахах або в схожому середовищі.
              </li>
              <li className="bg-white/5 p-3 rounded-sm border border-white/5">
                <strong className="text-[#4FACFE]">Завжди є вихід (Крадіжка):</strong> Отримайте +2 до Крадіжки при спробі Створити Перевагу, коли ви намагаєтесь втекти з приміщення.
              </li>
              <li className="bg-white/5 p-3 rounded-sm border border-white/5">
                <strong className="text-[#4FACFE]">Броня зі страху (Провокація):</strong> Ви можете використовувати Провокацію для захисту від фізичних атак, але тільки до того моменту, поки ви не отримаєте перший Стрес.
              </li>
              <li className="bg-white/5 p-3 rounded-sm border border-white/5">
                <strong className="text-[#4FACFE]">Дружелюбний брехун (Спілкування):</strong> Ви можете використовувати Спілкування замість Обману, щоб Створити Перевагу, яка базується на брехні.
              </li>
              <li className="bg-white/5 p-3 rounded-sm border border-white/5">
                <strong className="text-[#4FACFE]">Гроші говорять (Ресурси):</strong> Ви можете використовувати Ресурси замість Спілкування в ситуаціях, де демонстрація матеріального багатства може допомогти.
              </li>
              <li className="bg-white/5 p-3 rounded-sm border border-white/5">
                <strong className="text-[#4FACFE]">Контрудар (Бій):</strong> Якщо ви успішно Захистилися зі стилем (за допомогою Бою), ви можете завдати ворогу удар на 2 Зрушення замість того, щоб отримати Перевагу (Boost).
              </li>
              <li className="bg-white/5 p-3 rounded-sm border border-white/5">
                <strong className="text-[#4FACFE]">Майстер чуток (Контакти):</strong> Отримайте +2 до спроб Створити Перевагу за допомогою Контактів, коли ви поширюєте злісні чутки про когось.
              </li>
              <li className="bg-white/5 p-3 rounded-sm border border-white/5">
                <strong className="text-[#4FACFE]">Снайпер (Стрільба):</strong> Під час атаки Стрільбою витратьте Жетон Долі і назвіть конкретну ціль (наприклад, "Постріл в руку"). У разі успіху ви накладаєте цей Аспект на ворога.
              </li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
