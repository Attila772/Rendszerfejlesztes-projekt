export const TRANSLATIONS_HU = {
  notFound: "Az oldal nem található!",
  notification: {
    add: {
      success: "Sikeres {{subject}} létrehozás.",
      failure: "Sikertelen {{subject}} létrehozás.",
    },
  },
  common: {
    select: { choose: "Kérem válasszon" },
    interval: {
      7: "Heti",
      30: "Havi",
      90: "Negyedéves",
      180: "Féléves",
      365: "Éves",
    },
    issueStates: {
      NEW: "Új",
      ASSIGNED: "Kiosztva",
      ACCEPTED: "Elfogadva",
      DECLINED: "Elutasítva",
      IN_PROGRESS: "Folyamatban",
      COMPLETED: "Befejezve",
    },
    role: {
      1: "Eszközfelelős",
      2: "Operátor",
      3: "Karbantartó",
      4: "Adminisztrátor",
    },
    table: {
      email: "E-mail cím",
      level: "Jogosultsági szint",
      actions: "Műveletek",
      building: "Épület",
      room: "Helység",
      name: "Név",
      category: "Kategória",
      description: "Leírás",
      location: "Elhelyezkedés",
      isExceptional: "Kivételes-e",
      normaTimeInHours: "Norma idő",
      interval: "Intervallum",
      parentCategory: "'Szülő' kategória",
      user: "Felhasználó neve",
      from_date: "Módosítva",
      length: "Időtartam",
      state: "Állapot",
      task: "Feladat",
    },
    button: {
      add: "Hozzáadás",
      create: "Létrehozás",
      modify: "Módosítás",
      cancel: "Mégse",
      acceptAction: {
        schedule: "Karbantartás elfogadása",
      },
      declineAction: {
        schedule: "Karbantartás elutasítása",
      },
      startAction: {
        schedule: "Karbantartás megkezdése",
      },
      finishAction: {
        schedule: "Karbantartás befejezése",
      },
      createAction: {
        employee: "Dolgozó hozzáadása",
        location: "Helyszín hozzáadása",
        priviligeLevel: "Hozzáférési szint hozáadása",
        tool: "Eszköz hozzáadása",
        qualification: "Képesítés hozzáadása",
        category: "Kategória hozzáadása",
      },
      modifyAction: {
        employee: "Dolgozó módosítása",
        location: "Helyszín módosítása",
        priviligeLevel: "Hozzáférési szint módosítása",
        tool: "Eszköz módosítása",
        qualification: "Képesítés módosítása",
        category: "Kategória módosítása",
        schedule: "Ütemterv módosítása",
        scheduleAddUser: "Felhasználó hozzárendelése",
      },
      deleteAction: {
        employee: "Dolgozó törlése",
        location: "Helyszín törlése",
        priviligeLevel: "Hozzáférési szint törlése",
        tool: "Eszköz törlése",
        qualification: "Képesítés törlése",
        category: "Kategória törlése",
        schedule: "Ütemterv törlése",
        issue: "Feladat törlése",
      },
      detailsAction: {
        schedule: "Karbantartás részletei",
        employee: "Dolgozó részletei",
        tool: "Eszköz részletei",
        category: "Kategória részletei",
      },
    },
  },
  validation: {
    required: "A mező kitöltése kötelező!",
    email: "Az email cím formátuma nem megfelelő.",
  },
  drawer: {
    dashboard: "Főoldal",
    employee: "Dolgozók",
    issue: "Feladatok",
    tool: "Eszközök",
    category: "Kategóriák",
    interval: "Intervallumok",
    location: "Helyszínek",
    log: "Logok",
    qualification: "Képesítések",
    priviligelevel: "Hozzáférési szintek",
    schedule: "Ütemtervek",
    mySchedule: "Beosztásom",
  },
  schedule: {
    details: {
      title: "Karbantartás részletei",
      toolDescription: "Eszköz leíársa",
      categoryDescription: "Kategória leírása",
    },
    actions: {
      detailsTitle: "Karbantartás részletei",
    },
    user: {
      title: "Felhasználó",
      add: "Felhasználó hozzárendelése",
    },
    subject: "beosztás",
    deleteSuccess: {
      title: "Sikeres ütemterv törlés.",
    },
    acceptSuccess: {
      title: "Sikeres elfogadás.",
    },
    acceptFailure: {
      title: "Sikertelen elfogadás.",
    },
    declineSuccess: {
      title: "Sikeres elutasítás.",
    },
    declineFailure: {
      title: "Sikertelen elutasítás.",
    },
  },
  employee: {
    formLabels: {
      title: "Dolgozó adatai",
      email: "Email cím",
      password1: "Jelszó",
      password2: "Jelszó mégegyszer",
      trade: "Képesítés",
      level: "Jogosultsági szint",
    },
    createSuccess: {
      title: "Sikeres dolgozó létrehozás.",
    },
    createFailure: {
      notMatchingPasswords:
        "Sikertelen dolgozó hozzáadás. A jelszavak nem egyeznek.",
    },
    deleteSuccess: {
      title: "Sikeres dolgozó törlés.",
    },
    actions: {
      createTitle: "Dolgozó létrehozása",
      modifyTitle: "Dolgozó módosítása",
      detailsTitle: "Dologzó részletei",
    },
    modifySuccess: {
      title: "Sikeres dolgozó módosítás",
    },
    modifyFailure: {
      notMatchingPasswords:
        "Sikertelen dolgozó módosítás. A jelszavak nem egyeznek.",
    },
  },
  location: {
    formLabels: {
      title: "Helyszín adatai",
      building: "Épület",
      room: "Helység",
    },
    actions: {
      createTitle: "Helyszín létrehozása",
      modifyTitle: "Helyszín módosítása",
      detailsTitle: "Helyszín részletei",
    },
    createSuccess: {
      title: "Sikeres helyszín létrehozás.",
    },
    deleteSuccess: {
      title: "Sikeres helyszín törlés.",
    },
    modifySuccess: {
      title: "Sikeres helyszín módosítása",
    },
    modifyFailure: {
      notGoodBuilding:
        "Sikertelen helyszín módosítás. Rosszul megadott épület.",
    },
  },
  priviligeLevel: {
    formLabels: {
      title: "Hozzáférési szint adatai",
      name: "Neve",
    },
    actions: {
      createTitle: "Hozzáférési szint létrehozása",
      modifyTitle: "Hozzáférési szint módosítása",
    },
    createSuccess: {
      title: "Sikeres hozzáférési szint létrehozás.",
    },
    deleteSuccess: {
      title: "Sikeres hozzáférési szint törlés.",
    },
    modifySuccess: {
      title: "Sikeres hozzáférési szint módosítása",
    },
    modifyFailure: {
      notGoodName:
        "Sikertelen hozzáférési szint módosítás. Rosszul megadott név.",
    },
  },
  tool: {
    formLabels: {
      title: "Eszköz adatai",
      name: "Neve",
      category: "Kategória",
      description: "Leírása",
      location: { title: "Elhelyezkedés", building: "Épület", room: "Helység" },
    },
    actions: {
      createTitle: "Eszköz létrehozása",
      detailsTitle: "Eszköz részletei",
    },
    createSuccess: {
      title: "Sikeres eszköz létrehozás.",
    },
    deleteSuccess: {
      title: "Sikeres eszköz törlés.",
    },
  },
  qualification: {
    formLabels: {
      title: "Képesítés adatai",
      name: "Neve",
    },
    actions: {
      createTitle: "Képesítés létrehozása",
      modifyTitle: "Képesítés módosítása",
    },
    createSuccess: {
      title: "Sikeres képesítés létrehozás.",
    },
    deleteSuccess: {
      title: "Sikeres képesítés törlés.",
    },
    modifySuccess: {
      title: "Sikeres képesítés módosítása",
    },
    modifyFailure: {
      notGoodName: "Sikertelen képesítés módosítás. Rosszul megadott név.",
    },
  },
  category: {
    noParent: "-",
    formLabels: {
      title: "Kategória adatai",
      name: "Név",
      isExceptional: "Rendkívüli",
      normaTimeInHours: "Norma ideje",
      interval: "Intervallum",
      parentCategory: "Szülő kategória",
      description: "Leírás",
      qualification: "Szükséges képesítés",
    },
    actions: {
      createTitle: "Kategória létrehozása",
    },
    createSuccess: {
      title: "Sikeres kategória létrehozás.",
    },
    deleteSuccess: {
      title: "Sikeres kategória törlés.",
    },
  },
  log: {
    formLabels: {
      title: "Log adatai",
      status: "Státusz",
      dateTime: "Idő",
      user: "Felhasználó email címe",
    },
    actions: {
      createTitle: "Log létrehozása",
      modifyTitle: "Log módosítása",
    },
    createSuccess: {
      title: "Sikeres log létrehozás.",
    },
    deleteSuccess: {
      title: "Sikeres log törlés.",
    },
    modifySuccess: {
      title: "Sikeres log módosítása",
    },
    modifyFailure: {
      notGoodStatus: "Sikertelen log módosítás. Rosszul megadott státusz.",
    },
  },
  issue: {
    exceptional: "Rendkívüli",
    notExceptional: "Ütemezett",
    formLabels: {
      title: "Feladat adatai",
      name: "Név",
      category: "Kategória",
      assignedUser: "Hozzárendelt felhasználó",
      priority: "Prioritás",
      logs: "Logok",
      tool: "Eszköz",
    },
    createSuccess: {
      title: "Sikeres feladat létrehozás.",
    },
    deleteSuccess: {
      title: "Sikeres feladat törlés.",
    },
    actions: {
      createTitle: "Feladat létrehozása",
      modifyTitle: "Feladat módosítása",
      detailsTitle: "Feladat részletei",
    },
  },
};
