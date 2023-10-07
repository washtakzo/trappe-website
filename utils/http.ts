const API_BASE_URL = process.env.API_BASE_URL;
const API_TRAPPES_URL = API_BASE_URL + "trappes/";

export async function getAllTrappes() {
  const promise = new Promise<Trappe[]>(async (resolve, reject) => {
    try {
      const response = await fetch(API_TRAPPES_URL);
      if (!response.ok) {
        return reject(new Error(response.status + " : " + response.text));
      }
      const responseData = await response.json();

      const trappes: Trappe[] = responseData.data;

      //TODO:TODELETE
      // return reject(new Error("test error" + " : " + trappes[0].prices));

      // const reformattedTrappes: Trappe[] = trappes.map((trappe) => {
      //   return {
      //     ...trappe,
      //     prices: JSON.parse(trappe.prices),
      //   };
      // });

      return resolve(trappes);
    } catch (error) {
      return reject(error);
    }
  });

  return promise;
}

export function postTrappe(trappe: NewTrappe) {
  return fetch(API_TRAPPES_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trappe),
  });
}
