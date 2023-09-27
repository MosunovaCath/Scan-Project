import React, { useState } from "react";
import { searchData } from "./searchData";
import { useSelector } from "react-redux";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const SearchForm = (props) => {
  const [formData, setFormData] = useState({
    tonality: "",
    inn: "",
    startDate: "",
    endDate: "",
    limit: "",
    maxFullness: false,
    inBusinessNews: false,
    onlyMainRole: false,
    onlyWithRiskFactors: false,
    excludeTechNews: false,
    excludeAnnouncements: false,
    excludeDigests: false,
  });
  const [formErrors, setFormErrors] = useState({
    inn: "",
    limit: "",
  });
  const token = useSelector((state) => state.auth.token);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));

    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "inn":
        const numericValue = value.replace(/\D/g, "");
        if (numericValue.length !== 10) {
          error = "ИНН должен состоять из 10 цифр";
        }
        break;
      case "limit":
        const parsedValue = parseInt(value, 10);
        if (isNaN(parsedValue) || parsedValue < 1 || parsedValue > 1000) {
          error = "Количество документов должно быть от 1 до 1000";
        }
        break;
      default:
        break;
    }

    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [fieldName]: error,
    }));
  };

  const formatINN = (value) => {
    const numericValue = value.replace(/\D/g, "");

    let maskedValue = "";
    for (let i = 0; i < numericValue.length; i++) {
      if (i === 2 || i === 5 || i === 8) {
        maskedValue += " ";
      }
      maskedValue += numericValue[i];
    }

    return maskedValue.slice(0, 13);
  };

  const handleINNChange = (event) => {
    const value = event.target.value;
    const formattedValue = formatINN(value);
    formattedValue);

    setFormData((prevFormData) => ({
      ...prevFormData,
      inn: formattedValue,
    }));

    validateField("inn", formattedValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let hasErrors = false;
    for (const fieldName in formErrors) {
      if (formErrors[fieldName]) {
        hasErrors = true;
        break;
      }
    }

    if (hasErrors) {
      "Форма содержит ошибки");
      formErrors);
    } else {
      "Форма отправлена", formData);
    }
  };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //     "Content-type": "application/json",
  //   };
  //   const searchingData = (searchData = {
  //     issueDateInterval: {
  //       startDate: "2019-01-01T00:00:00+03:00",
  //       endDate: "2022-08-31T23:59:59+03:00",
  //     },
  //     searchContext: {
  //       targetSearchEntitiesContext: {
  //         targetSearchEntities: [
  //           {
  //             type: "company",
  //             sparkId: null,
  //             entityId: null,
  //             inn: 7710137066,
  //             maxFullness: true,
  //             inBusinessNews: null,
  //           },
  //         ],
  //         onlyMainRole: true,
  //         tonality: tonality,
  //         onlyWithRiskFactors: false,
  //         riskFactors: {
  //           and: [],
  //           or: [],
  //           not: [],
  //         },
  //         themes: {
  //           and: [],
  //           or: [],
  //           not: [],
  //         },
  //       },
  //       themesFilter: {
  //         and: [],
  //         or: [],
  //         not: [],
  //       },
  //     },
  //     searchArea: {
  //       includedSources: [],
  //       excludedSources: [],
  //       includedSourceGroups: [],
  //       excludedSourceGroups: [],
  //     },
  //     attributeFilters: {
  //       excludeTechNews: true,
  //       excludeAnnouncements: true,
  //       excludeDigests: true,
  //     },
  //     similarMode: "duplicates",
  //     limit: 1000,
  //     sortType: "sourceInfluence",
  //     sortDirectionType: "desc",
  //     intervalType: "month",
  //     histogramTypes: ["totalDocuments", "riskFactors"],
  //   });

  //   const requestData = {
  //     method: "POST",
  //     headers,
  //     body: JSON.stringify(searchingData),
  //   };
  //   const api =
  //     "https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms";
  //   requestData);
  //   fetch(api, requestData)
  //     .then((response) => {
  //       if (!response.ok) {
  //         response);
  //         throw new Error("Error");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       data);
  //     })
  //     .catch((error) => {
  //       error);
  //     });
  // };

  return (
    <>
      <button onClick={() => formData)}>check</button>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="INN-number">
              ИНН компании<sup>*</sup>
            </label>
            <input
              type="text"
              id="INN-number"
              placeholder="XX XXX XXX XX"
              name="inn"
              value={formData.inn}
              onChange={handleINNChange}
            />
            <div>{formErrors.inn}</div>
          </div>

          <label htmlFor="ton-select">Тональность</label>
          <select id="ton-select" name="tonality" onChange={handleChange}>
            <option value="any">Любая</option>
            <option value="negative">Негативная</option>
            <option value="positive">Позитивная</option>
          </select>

          <input
            type="date"
            onChange={handleChange}
            name="startDate"
            label="Basic date picker"
          />
          <input
            type="date"
            onChange={handleChange}
            name="endDate"
            label="Basic date picker"
          />
          <div>
            <label htmlFor="doc-count">
              Количество документов в выдаче<sup>*</sup>
            </label>
            <input
              type="number"
              name="limit"
              id="doc-count"
              placeholder="От 1 до 1000"
              value={formData.limit}
              onChange={handleChange}
            />
            <div>{formErrors.limit}</div>
          </div>
        </div>
        <div>
          <div>
            <input
              type="checkbox"
              name="maxFullness"
              onChange={handleChange}
              id="priz"
            />
            <label htmlFor="priz">Признак максимальной полноты</label>
          </div>
          <div>
            <input type="checkbox" id="upom" />
            <label htmlFor="upom" onChange={handleChange}>
              Упоминания в бизнес-контексте
            </label>
          </div>
          <div>
            <input type="checkbox" id="glav" />
            <label htmlFor="glav">Главная роль в публикации</label>
          </div>
          <div>
            <input type="checkbox" id="publ" />
            <label htmlFor="publ">Публикации только с риск-факторами</label>
          </div>
          <div>
            <input type="checkbox" id="teh" />
            <label htmlFor="teh">Включать технические новости рынков</label>
          </div>
          <div>
            <input type="checkbox" id="cal" />
            <label htmlFor="cal">Включать анонсы и календари</label>
          </div>
          <div>
            <input type="checkbox" id="news" />
            <label htmlFor="news">Включать сводки новостей</label>
          </div>
        </div>
        <button type="submit">Поиск</button>
      </form>
    </>
  );
};

export default SearchForm;
