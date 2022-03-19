export const TRANSLATIONS_HU = {
  notFound: "Az oldal nem található!",
  common: {
    select: { choose: "Kérem válasszon" },
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
    },
    button: {
      create: "Létrehozás",
      modify: "Módosítás",
      cancel: "Mégse",
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
      },
      deleteAction: {
        employee: "Dolgozó törlése",
        location: "Helyszín törlése",
        priviligeLevel: "Hozzáférési szint törlése",
        tool: "Eszköz törlése",
        qualification: "Képesítés törlése",
        category: "Kategória törlése",
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
  },
  employee: {
    formLabels: {
      title: "Dolgozó adatai",
      email: "Email cím",
      password1: "Jelszó",
      password2: "Jelszó mégegyszer",
      trade: "Trade",
      level: "Level",
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
      title: "Sikeres helyszín törlés.",
    },
    deleteSuccess: {
      title: "Sikeres helyszín törlés.",
    },
  },
  priviligeLevel: {
    formLabels: {
      title: "Hozzáférési szint adatai",
      name: "Neve",
    },
    actions: {
      createTitle: "Hozzáférési szint létrehozása",
    },
    createSuccess: {
      title: "Sikeres hozzáférési szint létrehozás.",
    },
    deleteSuccess: {
      title: "Sikeres hozzáférési szint törlés.",
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
    },
    createSuccess: {
      title: "Sikeres képesítés létrehozás.",
    },
    deleteSuccess: {
      title: "Sikeres képesítés törlés.",
    },
  },
  category: {
    formLabels: {
      title: "Kategória adatai",
      name: "Név",
      isExceptional: "Rendkívüli",
      normaTimeInHours: "Norma ideje",
      interval: "Intervallum",
      parentCategory: "Szülő kategória",
      description: "Leírás",
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
};
