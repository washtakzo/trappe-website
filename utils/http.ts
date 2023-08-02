import { rejects } from "assert";

const API_BASE_URL = process.env.API_BASE_URL;
const API_TRAPPES_URL = API_BASE_URL + "trappes/";

export async function getAllTrappes() {
  const promise = new Promise<Trappe[]>(async (resolve, reject) => {
    try {
      const response = await fetch(API_TRAPPES_URL);
      if (!response.ok) {
        throw new Error(response.status + " : " + response.text);
      }
      const responseData = await response.json();

      const trappes: FetchedTrappe[] = responseData.data;

      const reformattedTrappes: Trappe[] = trappes.map((trappe) => ({
        ...trappe,
        prices: JSON.parse(trappe.prices),
      }));

      resolve(reformattedTrappes);
    } catch (error) {
      reject(error);
    }
  });

  return promise;
}

export function postTrappe(trappe: Trappe) {
  return fetch(API_TRAPPES_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trappe),
  });
}

//NOTE: test
// const postNewTrappe = async () => {
//   const response = await postTrappe(
//   {
//     id: "3",
//     name: "Trappe Electrique",
//     prices: [
//       {
//         surface: 100,
//         pricePerMetter: 2.0,
//       },
//       {
//         surface: 800,
//         pricePerMetter: 1.9,
//       },
//       {
//         surface: 1200,
//         pricePerMetter: 1.7,
//       },
//     ],
//     min_width: 180,
//     max_width: 260,
//     min_height: 190,
//     max_height: 210,
//     short_description: "Trappe pour accès éléctrique",
//     long_description:
//       "Trappe de qualité allemande pour les regards en board de routes",
//     setup_price: 50,
//     shipping_price: 25,
//     images: [
//       "https://in-elec.com/wp-content/uploads/2016/08/ELSA_Regard_1-550x400.jpg",
//       "https://fr.jqcomposites.com/uploadfile/202008/25/9ce513ffc4158b0d68f6af970e92a3a2_medium.jpg",
//     ],
//   }
//  );
//   const data = await response.json();
//   console.log({ data });
// };
// postNewTrappe();
