const sh=a=>a.map(x=>[Math.random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]),R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const P=(t1,t2,s)=>({t1,t2,p:s.split('|').map(x=>x.split(':'))});
const N=g=>({g});
const numQ=(q,c)=>{const o=new Set([c]);while(o.size<4)o.add(c+R(-12,12));const a=sh([...o]);return[q,a.map(String),a.indexOf(c)]};
const fid=k=>/^\d+\.\d$/.test(k)?'f'+k.split('.')[0]:k;
const unseenCount=(s,seen,extra=[])=>{if(s.g)return 99;const ss=new Set(seen.map(fid));return s.p.filter((_,i)=>!ss.has('f'+i)).length+extra.filter(x=>!ss.has(x.id)).length};
const make=(s,n=20,seen=[],extra=[])=>{
  if(s.g){const ss=new Set(seen),out=[],keys=[];let t=0;
    while(out.length<n&&t++<500){const q=s.g();if(!ss.has(q[0])&&!keys.includes(q[0])){out.push(q);keys.push(q[0])}}
    while(out.length<n){const q=s.g();out.push(q);keys.push(q[0])}
    return {qs:out,keys};}
  const sf=seen.map(fid),ss=new Set(sf),items=[...s.p.map((_,i)=>({id:'f'+i,i})),...extra.map(x=>({id:x.id,x}))];
  const order=[...sh(items.filter(t=>!ss.has(t.id))),...items.filter(t=>ss.has(t.id)).sort((a,b)=>sf.indexOf(a.id)-sf.indexOf(b.id))].slice(0,n);
  const qs=sh(order).map(t=>{
    if(t.x)return[t.x.q,t.x.o,t.x.a];
    const d=s.t2?R(0,1):0,[k,a]=s.p[t.i],c=d?k:a,o=sh(s.p.filter((_,j)=>j!==t.i).map(x=>x[d?0:1]).filter(x=>x!==c)).slice(0,3),opts=sh([c,...o]);
    return[(d?s.t2:s.t1).replace('#',d?a:k),opts,opts.indexOf(c)]});
  return {qs,keys:order.map(t=>t.id)};
};
const count=(s,e=[])=>s.g?'∞':s.p.length+e.length;
const FIELDS=[
["Texnologiya","💻",["#7c3aed","#06b6d4"],[
["HTML teglari","🌐",P("HTML'da <#> tegi nima uchun ishlatiladi?","Qaysi HTML tegi: #?","h1:Asosiy sarlavha|p:Paragraf|a:Havola|img:Rasm|ul:Belgili ro'yxat|li:Ro'yxat elementi|table:Jadval|form:Forma|button:Tugma|input:Kiritish maydoni|div:Blok konteyner|span:Qator ichidagi konteyner")],
["CSS xossalari","🎨",P("CSS'da # xossasi nimani belgilaydi?","Qaysi CSS xossasi: #?","color:Matn rangi|font-size:Shrift o'lchami|margin:Tashqi masofa|padding:Ichki masofa|border:Chegara|display:Ko'rinish turi|position:Joylashuv usuli|background:Fon|width:Eni|height:Bo'yi|opacity:Shaffoflik|z-index:Qatlam tartibi")],
["JavaScript","⚡",P("JavaScript'da # nima qiladi?","Qaysi JavaScript funksiyasi: #?","push:Massiv oxiriga qo'shadi|pop:Massiv oxiridan olib tashlaydi|shift:Massiv boshidan olib tashlaydi|map:Har elementdan yangi massiv yasaydi|filter:Shartga mos elementlarni ajratadi|join:Massivni matnga aylantiradi|parseInt:Matnni butun songa aylantiradi|setTimeout:Kodni kechiktirib bajaradi|JSON.parse:JSON matnni obyektga aylantiradi|console.log:Konsolga chiqaradi|includes:Element borligini tekshiradi|splice:Massivdan bo'lak kesadi")],
["IT qisqartmalar","🖥️",P("# nimaning qisqartmasi?","Qaysi qisqartma: #?","CPU:Markaziy protsessor|RAM:Tezkor xotira|SSD:Tezkor qattiq disk|GPU:Grafik protsessor|USB:Universal ketma-ket shina|URL:Veb manzil|HTML:Gipermatn belgilash tili|PDF:Ko'chma hujjat formati|Wi-Fi:Simsiz tarmoq|BIOS:Asosiy kiritish-chiqarish tizimi|OS:Operatsion tizim|LAN:Mahalliy tarmoq")],
["Texnologiya asoschilari","🚀",P("# ni kim yaratgan yoki asos solgan?","Qaysi texnologiya yoki kompaniyani # yaratgan?","Python:Guido van Rossum|JavaScript:Brendan Eich|Java:James Gosling|C++:Bjarne Stroustrup|PHP:Rasmus Lerdorf|Ruby:Yukihiro Matsumoto|Linux:Linus Torvalds|Facebook:Mark Zuckerberg|Apple:Steve Jobs|Microsoft:Bill Gates|SpaceX:Elon Musk|Amazon:Jeff Bezos")]]],
["Tillar","🗣️",["#f59e0b","#ef4444"],[
["Ingliz so'zlari","🇬🇧",P("'#' so'zining tarjimasi qaysi?","'#' inglizcha qanday?","apple:olma|book:kitob|water:suv|house:uy|friend:do'st|school:maktab|tree:daraxt|sun:quyosh|bread:non|window:deraza|river:daryo|city:shahar")],
["Ingliz fe'llari","📝",P("'#' fe'lining past simple shakli qaysi?","'#' qaysi fe'lning past simple shakli?","go:went|see:saw|eat:ate|take:took|write:wrote|buy:bought|come:came|give:gave|know:knew|drink:drank|speak:spoke|run:ran")],
["Rus tili","🇷🇺",P("'#' so'zining tarjimasi qaysi?","'#' ruscha qanday?","дом:uy|книга:kitob|вода:suv|хлеб:non|друг:do'st|школа:maktab|город:shahar|окно:deraza|солнце:quyosh|мама:ona|спасибо:rahmat|привет:salom")],
["Nemis tili","🇩🇪",P("'#' so'zining tarjimasi qaysi?","'#' nemischa qanday?","Haus:uy|Buch:kitob|Wasser:suv|Brot:non|Freund:do'st|Schule:maktab|Stadt:shahar|Fenster:deraza|Sonne:quyosh|Mutter:ona|Danke:rahmat|Hallo:salom")],
["Adabiyot","📚",P("'#' asarining muallifi kim?","# qaysi asarni yozgan?","O'tkan kunlar:Abdulla Qodiriy|Xamsa:Alisher Navoiy|Boburnoma:Zahiriddin Bobur|Kecha va kunduz:Cho'lpon|Sarob:Abdulla Qahhor|Shum bola:G'afur G'ulom|Dunyoning ishlari:O'tkir Hoshimov|Qutlug' qon:Oybek|Ufq:Said Ahmad|Ulug'bek xazinasi:Odil Yoqubov|Yulduzli tunlar:Pirimqul Qodirov")]]],
["Aniq fanlar","🧮",["#10b981","#06b6d4"],[
["Hisob-kitob","➕",N(()=>{const a=R(12,99),b=R(11,60),t=R(0,2);return t==0?numQ(`${a} + ${b} = ?`,a+b):t==1?numQ(`${a+b} − ${b} = ?`,a):(m=>numQ(`${a} × ${m} = ?`,a*m))(R(3,12))})],
["Kvadrat va ildiz","√",N(()=>{const n=R(3,25);return R(0,1)?numQ(`${n}² = ?`,n*n):numQ(`√${n*n} = ?`,n)})],
["Foizlar","%",N(()=>{const p=[10,20,25,50,75][R(0,4)],a=40*R(1,12);return numQ(`${a} ning ${p}% i nechaga teng?`,a*p/100)})],
["Fizika birliklari","⚛️",P("# ning o'lchov birligi qaysi?","'#' qaysi kattalikning birligi?","Kuch:Nyuton|Energiya:Joul|Quvvat:Vatt|Bosim:Paskal|Tok kuchi:Amper|Kuchlanish:Volt|Qarshilik:Om|Chastota:Gers|Massa:Kilogramm|Vaqt:Sekund|Uzunlik:Metr|Harorat:Kelvin")],
["Kimyo elementlari","🧪",P("# elementining kimyoviy belgisi qaysi?","'#' belgisi qaysi elementga tegishli?","Oltin:Au|Kumush:Ag|Temir:Fe|Mis:Cu|Kislorod:O|Vodorod:H|Azot:N|Uglerod:C|Natriy:Na|Kaliy:K|Kalsiy:Ca|Geliy:He")]]],
["Geografiya va tabiat","🌍",["#22c55e","#a3e635"],[
["Poytaxtlar","🏙️",P("# qaysi davlatning poytaxti?","# davlatining poytaxti qaysi?","Toshkent:O'zbekiston|Tokio:Yaponiya|Parij:Fransiya|Berlin:Germaniya|Rim:Italiya|Madrid:Ispaniya|Moskva:Rossiya|Pekin:Xitoy|Ankara:Turkiya|Qohira:Misr|Ottava:Kanada|Nyu-Dehli:Hindiston")],
["Dunyo obidalari","🗼",P("# qaysi shaharda joylashgan?","# shahridagi mashhur obida qaysi?","Eyfel minorasi:Parij|Kolizey:Rim|Taj-Mahal:Agra|Registon:Samarqand|Ozodlik haykali:Nyu-York|Big Ben:London|Ichan qal'a:Xiva|Akropol:Afina|Sagrada Familia:Barselona|Burj Xalifa:Dubay|Kreml:Moskva|Poi Kalon:Buxoro")],
["Inson a'zolari","❤️",P("# ning vazifasi nima?","Qaysi a'zo: #?","Yurak:Qonni haydaydi|O'pka:Nafas oldiradi|Jigar:Zararli moddalarni zararsizlantiradi|Buyrak:Siydik hosil qiladi|Miya:Boshqaruv markazi|Oshqozon:Ovqatni hazm qiladi|Teri:Tanani himoya qiladi|Ko'z:Ko'rishni ta'minlaydi|Quloq:Eshitishni ta'minlaydi|Suyak:Tanaga tayanch beradi|Burun:Hid bilishni ta'minlaydi|Til:Ta'm bilishni ta'minlaydi")],
["Astronomiya","🪐",P("# — bu kim yoki nima?","'#' qanday tavsiflanadi?","Yer yo'ldoshi:Oy|Yulduzimiz:Quyosh|Halqali sayyora:Saturn|Qizil sayyora:Mars|Eng katta sayyora:Yupiter|Quyoshga eng yaqin sayyora:Merkuriy|Eng issiq sayyora:Venera|Quyoshdan eng uzoq sayyora:Neptun|Hayot mavjud sayyora:Yer|Mashhur dumli yulduz:Galley kometasi|Bizning galaktikamiz:Somon yo'li")],
["Hayvonot dunyosi","🦁",P("# asosan qayerda yashaydi?","Qaysi hayvon asosan '#' hududida yashaydi?","Pingvin:Antarktida|Kenguru:Avstraliya|Panda:Xitoy|Oq ayiq:Arktika|Tuya:Cho'l|Delfin:Dengiz|Maymun:Tropik o'rmon|Burgut:Tog'lar|Bo'ri:Tayga|Zebra:Savanna|Koala:Evkalipt o'rmoni|Qunduz:Daryo bo'yi")]]],
["Jamiyat","🏛️",["#ec4899","#8b5cf6"],[
["Tarix sanalari","⏳",P("# qaysi yilda sodir bo'lgan?","# yilda nima sodir bo'lgan?","Amir Temur tug'ilgan:1336|Amir Temur vafot etgan:1405|Birinchi jahon urushi boshlangan:1914|Ikkinchi jahon urushi boshlangan:1939|Ikkinchi jahon urushi tugagan:1945|O'zbekiston mustaqilligi e'lon qilingan:1991|Amerika Kolumb tomonidan kashf etilgan:1492|Fransuz inqilobi boshlangan:1789|Inson Oyga qo'ngan:1969|Titanik cho'kkan:1912|Gagarin koinotga uchgan:1961|Berlin devori qulagan:1989")],
["Buyuk shaxslar","👑",P("# nima bilan mashhur?","'#' kim haqida?","Mirzo Ulug'bek:Astronom|Al-Xorazmiy:Algebra asoschisi|Ibn Sino:Tabib|Beruniy:Qomusiy olim|Amir Temur:Sohibqiron|Alisher Navoiy:Shoir|Zahiriddin Bobur:Boburiylar asoschisi|Leonardo da Vinchi:Rassom|Isaak Nyuton:Butun olam tortishish qonuni|Albert Eynshteyn:Nisbiylik nazariyasi|Mariya Kyuri:Radioaktivlik tadqiqotchisi|Nikola Tesla:Elektr muhandisi")],
["Valyutalar","💱",P("# ning rasmiy valyutasi qaysi?","# qaysi davlatning valyutasi?","O'zbekiston:So'm|AQSh:Dollar|Yaponiya:Iyena|Rossiya:Rubl|Buyuk Britaniya:Funt sterling|Turkiya:Lira|Xitoy:Yuan|Hindiston:Rupiya|Germaniya:Yevro|Janubiy Koreya:Von|Qozog'iston:Tenge|Shveytsariya:Frank")],
["Davlat tillari","🗨️",P("# da asosiy rasmiy til qaysi?","# qaysi davlatning asosiy tili?","Braziliya:Portugal tili|Fransiya:Fransuz tili|Germaniya:Nemis tili|Yaponiya:Yapon tili|AQSh:Ingliz tili|Ispaniya:Ispan tili|Italiya:Italyan tili|Turkiya:Turk tili|Rossiya:Rus tili|Eron:Fors tili|Xitoy:Xitoy tili|Ukraina:Ukrain tili")],
["Bayramlar","🎉",P("# qaysi sanada nishonlanadi?","# sanasida qaysi bayram nishonlanadi?","Navro'z:21-mart|Mustaqillik kuni:1-sentabr|Konstitutsiya kuni:8-dekabr|Yangi yil:1-yanvar|Xotira va qadrlash kuni:9-may|Ustoz va murabbiylar kuni:1-oktabr|Xalqaro xotin-qizlar kuni:8-mart|Vatan himoyachilari kuni:14-yanvar|Bolalarni himoya qilish kuni:1-iyun|O'zbek tili bayrami:21-oktabr|Davlat bayrog'i kuni:18-noyabr")]]],
["Hayot va madaniyat","🎭",["#f97316","#eab308"],[
["San'at asarlari","🖼️",P("'#' asarining muallifi kim?","# qaysi asarni yaratgan?","Mona Liza:Leonardo da Vinchi|Yulduzli tun:Vinsent van Gog|Gernika:Pablo Pikasso|Hamlet:Vilyam Shekspir|Urush va tinchlik:Lev Tolstoy|Oqqush ko'li:Pyotr Chaykovskiy|Oy nuri sonatasi:Betxoven|Ilohiy komediya:Dante Aligyeri|Don Kixot:Servantes|Jinoyat va jazo:Dostoyevskiy|Kichik shahzoda:Antuan de Sent-Ekzyuperi")],
["Sport raqamlari","⚽",P("Sport savoli: # — javobi nima?","Qaysi ma'lumotga '#' mos keladi?","Futbol jamoasidagi maydon o'yinchilari:11|Basketbol jamoasidagi maydon o'yinchilari:5|Voleybol jamoasidagi maydon o'yinchilari:6|Shaxmat taxtasidagi kataklar:64|Marafon masofasi (km):42|Olimpiada necha yilda bir o'tkaziladi:4|Regbi jamoasidagi o'yinchilar:15|Shaxmatda bir tomonning donalari:16|Basketbol halqasi balandligi (m):3.05|Futbol o'yini davomiyligi (daqiqa):90|Gandbol jamoasidagi maydon o'yinchilari:7")],
["Oylar va kunlar","📅",P("'#' — tartib raqami qanday?","'#' qaysi nomga to'g'ri keladi?","Yanvar:1-oy|Fevral:2-oy|Mart:3-oy|Aprel:4-oy|May:5-oy|Iyun:6-oy|Iyul:7-oy|Avgust:8-oy|Sentabr:9-oy|Oktabr:10-oy|Noyabr:11-oy|Dekabr:12-oy")],
["Brendlar","🏷️",P("# kompaniyasining mashhur mahsuloti qaysi?","'#' qaysi kompaniya mahsuloti?","Apple:iPhone|Samsung:Galaxy|Sony:PlayStation|Nintendo:Mario|Google:Android|Microsoft:Windows|Toyota:Corolla|Ford:Mustang|Tesla:Cybertruck|Lego:Konstruktor|Nokia:3310")],
["Sog'lom hayot","🥗",P("# eng ko'p qaysi manbada uchraydi?","Qaysi modda '#' ga boy?","Vitamin C:Sitrus mevalar|Vitamin D:Quyosh nuri|Kalsiy:Sut|Vitamin A:Sabzi|Omega-3:Baliq|Kaliy:Banan|Yod:Dengiz mahsulotlari|Oqsil:Tuxum|Vitamin K:Ismaloq|Vitamin B12:Go'sht|Tola:Don mahsulotlari")]]]
];
const MORE={
"HTML teglari":"ol:Tartiblangan ro'yxat|br:Qator uzish|hr:Gorizontal chiziq|video:Video joylashtirish|audio:Audio joylashtirish|nav:Navigatsiya bloki|footer:Sahifaning quyi qismi|textarea:Ko'p qatorli matn maydoni",
"CSS xossalari":"border-radius:Burchaklarni yumaloqlash|box-shadow:Soya berish|font-weight:Shrift qalinligi|text-align:Matnni tekislash|line-height:Qator balandligi|overflow:Ortiqcha tarkibni boshqarish|cursor:Sichqoncha ko'rsatkichi|transition:Silliq o'tish effekti",
"JavaScript":"reduce:Massivni bitta qiymatga yig'adi|forEach:Har element uchun funksiya bajaradi|slice:Massivning nusxa bo'lagini oladi|indexOf:Elementning o'rnini topadi|sort:Massivni saralaydi|reverse:Massivni teskari aylantiradi|Math.random:Tasodifiy son beradi|JSON.stringify:Obyektni JSON matnga aylantiradi",
"IT qisqartmalar":"HTTP:Gipermatn uzatish protokoli|DNS:Domen nomlari tizimi|VPN:Virtual xususiy tarmoq|IP:Internet protokoli|AI:Sun'iy intellekt|SQL:Tuzilgan so'rovlar tili|CSS:Kaskadli uslublar jadvali|API:Dasturlash interfeysi",
"Texnologiya asoschilari":"Google:Larry Page|Wikipedia:Jimmy Wales|Twitter:Jack Dorsey|Netflix:Reed Hastings|Telegram:Pavel Durov|Oracle:Larry Ellison|WhatsApp:Jan Koum|Alibaba:Jack Ma",
"Ingliz so'zlari":"cat:mushuk|dog:it|milk:sut|moon:oy|flower:gul|car:mashina|door:eshik|mountain:tog'",
"Ingliz fe'llari":"do:did|have:had|make:made|say:said|get:got|think:thought|find:found|tell:told",
"Rus tili":"кошка:mushuk|собака:it|молоко:sut|луна:oy|цветок:gul|машина:mashina|дверь:eshik|гора:tog'",
"Nemis tili":"Katze:mushuk|Hund:it|Milch:sut|Mond:oy|Blume:gul|Auto:mashina|Tür:eshik|Berg:tog'",
"Adabiyot":"Sariq devni minib:Xudoyberdi To'xtaboyev|Ona:Maksim Gorkiy|Yevgeniy Onegin:Aleksandr Pushkin|Robinzon Kruzo:Daniel Defo|Garri Potter:Joan Rouling|Uch mushketyor:Aleksandr Dyuma|Kapitan Grantning bolalari:Jyul Vern|Gulliverning sayohatlari:Jonatan Svift|Pinokkio:Karlo Kollodi",
"Fizika birliklari":"Tezlik:Metr/sekund|Hajm:Kubometr|Yuza:Kvadrat metr|Zichlik:Kilogramm/kubometr|Elektr sig'imi:Farad|Yorug'lik kuchi:Kandela|Modda miqdori:Mol|Burchak:Radian",
"Kimyo elementlari":"Alyuminiy:Al|Rux:Zn|Qo'rg'oshin:Pb|Simob:Hg|Kremniy:Si|Xlor:Cl|Oltingugurt:S|Magniy:Mg",
"Poytaxtlar":"Seul:Janubiy Koreya|London:Buyuk Britaniya|Vashington:AQSh|Astana:Qozog'iston|Bishkek:Qirg'iziston|Dushanbe:Tojikiston|Ashxobod:Turkmaniston|Kobul:Afg'oniston",
"Dunyo obidalari":"Aya-Sofiya:Istanbul|Brandenburg darvozasi:Berlin|Sidney Opera teatri:Sidney|Qiyshiq minora:Piza|Alhambra saroyi:Granada|Oltin ma'bad:Kioto|Taqiqlangan shahar:Pekin|Piramidalar:Qohira",
"Inson a'zolari":"Qizilo'ngach:Ovqatni oshqozonga o'tkazadi|Qalqonsimon bez:Moddalar almashinuvini boshqaradi|Taloq:Qonni filtrlaydi|Me'da osti bezi:Insulin ishlab chiqaradi|Ichak:Ozuqa moddalarini qonga so'radi|Bo'g'im:Suyaklarni bir-biriga bog'laydi|Mushak:Harakatni ta'minlaydi|Diafragma:Nafas olishga yordam beradi",
"Astronomiya":"Yon tomonida yotib aylanadigan sayyora:Uran|Oyga birinchi qadam qo'ygan inson:Nil Armstrong|Koinotga uchgan birinchi inson:Yuriy Gagarin|Birinchi sun'iy yo'ldosh:Sputnik-1|Quyosh nurining Yerga yetib kelish vaqti:Taxminan 8 daqiqa|Yerning Quyosh atrofida aylanish davri:365 kun|Quyoshdan keyingi eng yaqin yulduz:Proksima Sentavra|Mitti sayyora deb tasniflangan jism:Pluton|Koinot paydo bo'lishi nazariyasi:Katta portlash",
"Hayvonot dunyosi":"Lemur:Madagaskar|Kondor:And tog'lari|Flamingo:Sho'r ko'llar|Gorilla:Markaziy Afrika o'rmonlari|Orangutan:Borneo va Sumatra|Lama:Janubiy Amerika tog'lari|Piranya:Amazonka daryosi|Kivi qushi:Yangi Zelandiya",
"Tarix sanalari":"Rim imperiyasining G'arbiy qismi qulagan:476|Konstantinopol fath etilgan:1453|Vasko da Gama Hindistonga yetib kelgan:1498|Napoleon Vaterloda mag'lub bo'lgan:1815|AQSh mustaqillik deklaratsiyasi qabul qilingan:1776|Rossiyada Oktyabr inqilobi:1917|Chernobil AES halokati:1986|Bobur Boburiylar saltanatini asos solgan:1526",
"Buyuk shaxslar":"Aristotel:Qadimgi yunon faylasufi|Kolumb:Amerikani kashf etgan sayohatchi|Galileo Galiley:Teleskop bilan osmonni kuzatgan olim|Charlz Darvin:Evolyutsiya nazariyasi muallifi|Mahatma Gandi:Hindistonning mustaqillik yetakchisi|Mustafo Kamol Otaturk:Turkiya Respublikasi asoschisi|Abdulla Avloniy:Jadid ma'rifatparvari|Mark Tven:Amerikalik yozuvchi",
"Valyutalar":"Kanada:Kanada dollari|Avstraliya:Avstraliya dollari|Braziliya:Real|Meksika:Peso|Polsha:Zlotiy|Shvetsiya:Shved kronasi|Misr:Misr funti|Birlashgan Arab Amirliklari:Dirham",
"Davlat tillari":"Polsha:Polyak tili|Gollandiya:Golland tili|Shvetsiya:Shved tili|Gretsiya:Yunon tili|Janubiy Koreya:Koreys tili|Misr:Arab tili|Vetnam:Vetnam tili|Tojikiston:Tojik tili",
"Bayramlar":"Xalqaro mehnat kuni:1-may|Yer kuni:22-aprel|Jahon kitob kuni:23-aprel|Jahon sog'liqni saqlash kuni:7-aprel|Kosmonavtika kuni:12-aprel|Xalqaro talabalar kuni:17-noyabr|Inson huquqlari kuni:10-dekabr|Hazil kuni:1-aprel|Sevishganlar kuni:14-fevral",
"San'at asarlari":"To'rt fasl:Antonio Vivaldi|Bolero:Moris Ravel|Gilos bog'i:Anton Chexov|To'qqizinchi to'lqin:Ivan Ayvazovskiy|Sikstin Madonnasi:Rafael Santi|Dovud haykali:Mikelanjelo|Dorian Greyning portreti:Oskar Uayld|Usta va Margarita:Mixail Bulgakov|Faust:Iogann Gyote",
"Sport raqamlari":"Dzyudo vatani:Yaponiya|Taekvondo vatani:Janubiy Koreya|Shaxmat vatani:Hindiston|Golf vatani:Shotlandiya|Kurash vatani:O'zbekiston|Futbol vatani:Angliya|Sambo vatani:Rossiya|Kapoeyra vatani:Braziliya|Basketbol vatani:AQSh",
"Oylar va kunlar":"Dushanba:Haftaning 1-kuni|Seshanba:Haftaning 2-kuni|Chorshanba:Haftaning 3-kuni|Payshanba:Haftaning 4-kuni|Juma:Haftaning 5-kuni|Shanba:Haftaning 6-kuni|Yakshanba:Haftaning 7-kuni|Bahor:Fasllarning birinchisi",
"Brendlar":"Nike:Air Max|McDonald's:Big Mac|Xiaomi:Redmi|Huawei:Mate|Chevrolet:Cobalt|Nestle:KitKat|Lenovo:ThinkPad|Nvidia:GeForce|BMW:X5",
"Sog'lom hayot":"Vitamin E:O'simlik moyi|Magniy:Yong'oq|Temir:Jigar|Vitamin B6:Tovuq go'shti|Antioksidantlar:Rezavor mevalar|Probiotiklar:Qatiq|Vitamin B1:Dukkakli o'simliklar|Selen:Braziliya yong'og'i|Xrom:Brokkoli"
};
FIELDS.forEach(f=>f[3].forEach(s=>{const m=MORE[s[0]];if(m)s[2].p.push(...m.split('|').map(x=>x.split(':')))}));
module.exports={FIELDS,make,count,unseenCount};
