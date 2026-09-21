import { Injectable } from '@angular/core';

export interface Message {
  subject: string;
  detalis: string;
  date: string;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public messages: Message[] = [
    {
      subject: 'Co robię teraz?',
      detalis: 'Dodawanie dat pozwoleń na urządzenia bezobsługowe w Polsce',
      date: '',
      read: true
    },
    {
      subject: 'Lista przemienników DMR i FM Poland',
      detalis: 'Dla przemienników FM Poland i DMR (wybrane kraje) dodano lisę oraz możliwość zobaczenia ich odrazu na mapie',
      date: '2025-12-01',
      read: false
    },        
    {
      subject: 'Statusy przemienników i testy zgłaszania błędów',
      detalis: 'Dodano informację o aktualnym statusie przemiennika (planowany/budowany/testowy/nieznany/działający/wyłączony). Na stronie każdego przemiennika dodano opis jak zgłaszać błedy, obecnie obowiązuje tryb zgłaszania przez discorda, potem wyciągnie się jakieś wnioski. Na razie mała próba czy ma to sens.',
      date: '2025-11-24',
      read: true
    },       
    {
      subject: 'Przemienniki w zasięgu',
      detalis: 'Ograniczenie filtrowanych przemienników do zadanego promienia, np 100km od wskazanej pozycji. W rozwijanym menu po lewej stronie dodano opcje "ogranicz do ..km" po jej zaznaczeniu zmiejszymy obszar fitrowania do zadanego promienia, maksymalną odległośc od przemiennika ustawiamy suwakiem poniżej.',
      date: '2025-06-25',
      read: true
    },      
    {
      subject: 'DMR na wakacjach',
      detalis: 'Niedługo wakacje, jeśli ktoś by chciał szybko połączyć się z krajem dodano okresowo przemienniki DMR dla takich krajów jak: Chorwacja, Malta, Grecja, Cypr, Hiszpania, Portugalia, Węgry, Rumunia, Mołdawia, Macedonia, Tajlandia, Katar, Zjednoczone Emiraty Arabskie, Peru, Nowa Zelandia, Republika Południowej Afryki (RPA) i Austrię (jak by ktoś z Australią pomylił). Niestety w Albanii, Egipcie, Tunezji, Malediwach, Maroko, Haiti, na Dominikanie, Kubie i w Japonii przemienników DMR nie znalazłem, a to szkoda.',
      date: '2025-06-19',
      read: true
    },       
    {
      subject: '2 nowe kontynety',
      detalis: 'W ramach testów bazy danych dodano wszystkie przemienniki DMR z Antarktydy i Australii, jezcze tylko 5 kontynetów i wszystkei przemienniki DMR z naszego układu słonecznego będą wyświetlane.',
      date: '2025-06-19',
      read: true
    },      
    {
      subject: 'Twoja lokalizacja',
      detalis: 'W rozwijanym menu po lewej stronie dodano przycisk ZNAJDŹ MNIE po jego kliknięciu używana przeglądarka poprosi cie o zgodę na sprawdzenie twojej lokalizacji i jeśli ją wyrazisz ludek z mapy przesunie się tak by pokazać twoją szacowaną pozycję, a dane w zakładce wypełnią się twoim lokatorem i pozycją GPS. Mam nadzieję że zaoszczędzi to czas niektórym, lub pomoże odnaleźć się w nowym terenie czy w podróży.',
      date: '2025-06-11',
      read: true
    },       
    {
      subject: 'Obliczanie odległości',
      detalis: 'Dodano odległość i azymutu od przemienników. Twoja odległość obliczana jest od ikony ludka, którą można przesówać lub wpisać rędznie swoją pozycję GPS lub lokator w rozwijanym menu po lewej stronie.',
      date: '2025-06-09',
      read: true
    },    
    {
      subject: 'QTH',
      detalis: 'Poprawiono QTH lokatory przemienników',
      date: '2025-06-02',
      read: true
    },      
    {
      subject: 'przemienniki.net 2.0',
      detalis: 'Polski Związek Krótkofalowców wchłonął przemienniki.net. Cieszę się że przez pół roku Mapy73pl mogły bezpłatnie dla wszystkich załatać nagłą utratę danych o przemiennikach. Ja ze swej strony muszę przemyśleć tego czarnego łabędzia, na pewno nie chcę być konkurencją do pierwowzoru, który nagle zniknął lecz bardzie jego uzupełnieniem. O ile społeczność krótkofalarska pozwoli traktowałbym przemienniki.net jako bazę danych dla przemienników FM, jeśli nie pozwoli to pójdę w stronę przemienników które weryfikuje automatycznie (FMlink, fmPoland, DMR). Nie mniej jednak chciałbym by była jakaś alternatywa jeśli by strona przemienniki.net nagle przestała działać, na razie sporadycznie występują niedostępności strony HTTP404. Mapy73pl działają już bez internetu i ten stan rzeczy chcę utrzymać, co pewno da się też zrobić z przemiennikami.net ale rozumiem że przez kolejny rok strona będzie jeszcze przywracana do normalności (PZK ma fundusze więc myślę że jakaś agencja UX może zrobić audyt, ale nie śmiem niczego narzucać i tak podziwiam uruchomienie strony). Podsumowując trzymam kciuki za całą ekipę z przemienniki.net, cieszę się że krótkofalowcy zjednoczyli się pod sztandarem PZK (i mam nadzieję że chociaż w naszym środowisku poradzimy sobie z polaryzacją społeczeństwa). Mogę się tylko domyśleć przez ile problemów pokonali administratorzy i programiści by ożywić przemienniki.net, Mapy73pl w tym czasie troszkę wyewoluowały z bazą danych i o ile można by było łatwo dodać do tabel grupy rozmowne fmPoland, czy Color Code i TG przemienników DMR o tyle są trzy przypadki specyficznych przemienników których w oryginalnej bazie nie da się ogarnąć, moderatorzy zwrócą wam na to uwagę, dlatego zbytnio nie widzę opcji wrzucenia interfejsu użytkownika z map73pl do przemienników.net (zbyt duże rozbieżności w bazie, aby nie powiedzieć iż zupełnie inna struktura danych), dlatego myślę że Mapy73pl zostaną alternatywą dla przemenników.net gdy strona nagle przestanie działać, lub ktoś nie będzie miał dostępu do internetu. Reasumując świetna robota, trzymam za was panowie kciuki (nie pokłócie się tylko w tym dużym gronie i dowieźcie temat do końca nawet jak zamię to kolejne 2 lata, z mojej strony szacunek i podziw dla was)',
      date: '2025-05-28',
      read: true
    }, 
    {
      subject: 'Lepsza wersja mobile',
      detalis: 'Z ukłonem dla posiadaczy telefonów komórkowych, przystosowano wygląd strony dla użądzeń z mniejszym ekranem. Opcje exportu przemienników do zewnetrznych programów przeniesono w prawy dolny róg ekranu (trzeba kliknąc takie kułeczko by dodać/usunąć hurtowo wyfiltrowane pzemienniki)',
      date: '2025-05-26',
      read: true
    },          
    {
      subject: 'QTH Lokator',
      detalis: 'Na mapie dodano ikone ludka zmierzającego do radia, można go przesuwać wówczas w drugiej zakładce filtrów (też z ikonka ludka) będzie pokazywać się jego pozycja GPS oraz obliczany QTH lokator. Pozycje GPS jak i lokator można też wpsiać z palca w filtrze wówczas ludek się przesunie i pokaże dane miejsce (jeśli byśmy chieli się dowiedzieć gdzie jest jest nasz radiowy lokator)',
      date: '2025-05-16',
      read: true
    },       
    {
      subject: 'Export do OpenGD77',
      detalis: ' Export przemienników do OpenGD77 z dodaniem do stref (dla Polski rozróznienie na okregi SR1,SR2,..,SR9) typy: DMR i FM (dla przemiennikow fmLink i fmPoland dopisano informacje w nazwe, tak by szybko wiedzieć iż naciśniecie PTT na fmLinku uruchomi nadawanie na pozostałych 18 przemiennikach w kraju, a w przypadku fmPoland by wiedzieć iż można przełączyć się na grupy rozmowe i zlinkować sobie np inny przemiennik). Export przemienników DMR wraz z Color Code (CC) i ustawieniami slotów (TS1, TS2) dla zdefiniowanych Talkgroups (TG)',
      date: '2025-05-07',
      read: false
    }, 
    {
      subject: 'DMR Talk Group i Time Sloty',
      detalis: 'Dodano grupy rozmowne (TG) przemienników DMR z podziałem na Time Sloty (TS1/TS2) stosownie do ustawień danego przemiennika.',
      date: '2025-05-06',
      read: false
    },    
    {
      subject: 'DMR Color Code',
      detalis: 'Dodano nowe przemienniki DMR, dodano parametr Color Code (CC) w pozostałych przemiennikach.',
      date: '2025-05-05',
      read: true
    },        
    {
      subject: 'FM-Poland Talk Group',
      detalis: 'Dodano brakujace przemienniki sieci FM-Poland, zaktualizowano brakujace lokalizacje a mapie (teraz wszystkie już są widoczne na mapie). Dodano w niektórych przemiennikach podląd TG (Talk Group) domyślnej i monitorowanej.',
      date: '2025-04-30',
      read: true
    },      
    {
      subject: 'Export Yaesu',
      detalis: 'Export zapisanych przemienników do formatu Yaesu',
      date: '2025-04-16',
      read: true
    },  
    {
      subject: 'Export Icom',
      detalis: 'Export zapisanych przemienników do formatu Icom',
      date: '2025-04-02',
      read: true
    },      
    {
      subject: 'Exporty',
      detalis: 'Export zapisanych przemienników bepośrednio ze strony do arkusza LibreOfficeCalc/MicrosoftExcel lub programu CHIRP',
      date: '2025-03-27',
      read: true
    },   
    {
      subject: 'Tryb Off-line',
      detalis: 'Dostępny dla wszystkich lecz napisany głównie dla Sieci Ratunkowej EmCom Polska (z najgłebszymi wyrazami szacunku dla ich inicjatywy). Dostępna jest już wersja trybu off-line (w przypadku braku internetu strona powinna dalej wyświetlać informacje o przemiennikach). Tryb offline ładuję się automatycznie, wystarczy wejśc na stronę główną z mapkami i oczekać 2s-30s (w zależności od predkości łacza internetowego), raz odświeżyć stronę, dobrze potem odpiąc się od internetu by przetestować rezultat. Tryb offline oparty na technologi PWA, obsługiwany przez wiekszość przeglądarek internetowych.',
      date: '2025-03-19',
      read: true
    },   
    {
      subject: 'Filtr',
      detalis: 'Na stronie głównej od dzisaj można filtrować również po przemiennikach, których nie ma na mapie. W przyszłości pomoże to z wyborem przemienników do exportu. Na razie dodajac przemienniki i kikając w prawym górnym rogu w ikonę chmórki wyświetli nam się lista wraz z linkiem do pełnego opisu tego przemiennika',
      date: '2025-03-05',
      read: true
    },     
    {
      subject: 'Chirp import',
      detalis: 'Chirp to program potrafiący programować wiele transceiverów. Od dziś dostępnny jest import danych wprost z serwisu. W programie wystarczy kliknąć radiostacja -> źródło zapytań -> mapy73.pl by wybrać interesującą nas grupę przemienników. Najnowszy program możecie pobrać wprost ze strony https://chirpmyradio.com/',
      date: '2025-02-21',
      read: true
    }, 
    {
      subject: 'Off-line testy',
      detalis: 'Testowa wersja trybu off line, po odłączeniu internetu belka tytułowa powinna zmienić kolor na czerwony, a przemienniki które wyświetlaiście poprzednio powinny być dostępne nawet pomimo braku połaczenia intenetowego, mam nadzeję że przyda się w terenie.',
      date: '2025-02-17',
      read: true
    }, 
    {
      subject: 'Nowy typ',
      detalis: 'Dodano nowy typ przemienników FM-Poland, więcej informacji o tej sieci znajdziecie w sekcji linki każdego przemiennika.',
      date: '2025-02-13',
      read: true
    },  
    {
      subject: 'Nowe ikony',
      detalis: 'Czarna ikona oznacza miejsce gdzie ilośc przemienników jest większa, białą ikoną oznaczono przemienniki cross-bandowe',
      date: '2025-02-11',
      read: true
    },  
    {
      subject: 'RX i TX',
      detalis: 'Informacje o przemienniku na jakiej częstotliwości pracuje i jak aktywować przemiennik.',
      date: '2025-02-10',
      read: true
    },  
    {
      subject: 'Dodatkowe inforamcje o przemienniku',
      detalis: 'Na osobnej stronie o przemienniku dodano: moc, informacje, opiekuna i linki zewnetrzne',
      date: '2025-02-04',
      read: true
    },  
    {
      subject: 'Wyszukanie konkretnego przemiennika na mapie',
      detalis: 'Dodano przejscie z strony danego przemiennika do wyświetlenia przemiennika na mapie. Na stronie głównej możemy już filtrować po dokładnym dopasowaniu nazwy przemiennika. Np wpisując "SR2G" wyświetli nam się tylko jeden pasujący przemiennik',
      date: '2025-02-03',
      read: true
    },         
    {
      subject: 'Informacje o przemienniku',
      detalis: 'Dodano informacje o każdym przemienniku (osobna strona lub wyskakujące okno na mapie), dostępna dokładna lokalizacja przemiennika łącznie z wysokością.',
      date: '2025-01-31',
      read: true
    },  
    {
      subject: 'Filtry',
      detalis: 'Zakończono pracę nad filtrami wyświetlanych przemienników na mapie, jest już możliwość filtracji po kraju przemiennika, statusie, paśmie i typie. Dodatkowo filtrując nazwę przemiennika można bardzo ciekawie pokazać obszary naszych okręgów, np. Wpisując SR2 z znaczonymi wszystkim opcjami pokaże nam się obszar województwa pomorskiego i kujawsko-pomorskiego, podobnie jeśli chcemy podejrzeć zasięg okręgu 4 można wpisać SR4',
      date: '2025-01-30',
      read: true
    },    
    {
      subject: 'Mapa przemienników',
      detalis: 'Mapka z pokazaną pozycją przemienników jest już dostępna, oprócz przemienników z Polski pokazuje też przemienniki z innych krajów. Przemienniki pracujące na kilku pasmach dostały nową ikonę 2,3 kolorową (zależnie od ilości pasm) oraz zostały oznaczone flagą crossband',
      date: '2025-01-28',
      read: true
    },        
    {
      subject: 'Start Mapy73.pl',
      detalis: 'Nazwa przemienniki net pomimo swojej renomy jest zbyt długa i podatna na literówki (kilka razy mi się zdarzyły). Po sobotnim researchu nazwa Mapy73 PL jakoś najbardziej mi się spodobała, dlatego pomijam szukanie kontaktu do właściciela serwera przemienniki net (na stronie jest tylko komunikat o końcu strony i udostępniony plik bazy danych). Domena jest już kupiona, wyszło 20zł. Serwer hostingowy znaleziony, certyfikat SSL zainstalowany, nic tylko pisać kodzik w wolnym czasie. Pieniądze mam, nie martwcie się o nic. Mam nadzieję że będziecie korzystać z radiowej wiedzy do woli!',
      date: '2025-01-28',
      read: true
    },      
    {
      subject: 'Import MySQL dump 10.13',
      detalis: 'Wchłonięto dump udostępnionej publicznie bazy danych. Projektant bazy wygląda na osobę bliską Linux bo kolumny `band` i `mode` wyglądają znajomo do struktury uprawnień plików. W Linux z trzech parametrów (read: 4, write: 2, execute: 1) jedną cyfrą możemy otrzymać wiele informacji 7 (r w x), 6 (r w), 5 (r x), 4 (r), 3 (w x), 2 (w) 1 (x). 6 stycznia 2025 użytkownik o numerze identyfikacyjnym 19 dokonał ostanich akutalziacjiw danych przemienników SR8LBL, SR4BI, SR7WI, SR9SC, SR2MAL, SR9DJC-C, SR4MR, SR8JR, 2 tygodnie później prace zostały porzucone. W sumie aż 1146 przeminików zostało zaktualizowanych w ostanich 6 miesiącach.',
      date: '2025-01-26',
      read: true
    },    
    {
      subject: 'Koniec strony przemienniki net',
      detalis: 'Po 15 latach działania strona przemienniki net została zaorana i zakopana głęboko pod ziemią. Strasznie mi szkoda pracy jej autorów, lecz rozumiem kwestie życia prywatnego. Osobiście coś niecoś umiem programować, więc postanowiłem nie dopuścić do utraty tych danych, z których sam często kożystałem.',
      date: '2025-01-24',
      read: true
    },
  ];

  constructor() { }

  public getMessages(): Message[] {
    return this.messages;
  }

  public getMessageById(id: number): Message {
    return this.messages[id];
  }
}
