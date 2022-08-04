export function buildQuery(query: any) {
  /**
   * {
   *   { "title": /<keyword>/i },
   *   { "title": /<keyword>/i },
   *   { "createdAt": { $gte: "<startDate>", $lte: "<endDate>" } },
   *
   * }
   */
  let result = {};
  //   const allowedQuery = ["keyword", "limit", "startDate", "endDate"];

  if (query["keyword"] && query["keyword"] != "") {
    result = {
      ...result,
      $or: [
        { title: new RegExp(`${query["keyword"]}`, "i") },
        { body: new RegExp(`${query["keyword"]}`, "i") },
      ],
    };
  }
  if (
    query["startDate"] &&
    query["endDate"] &&
    query["startDate"] != "" &&
    query["endDate"] != ""
  ) {
    const startDate = new Date(query["startDate"]);
    const endDate = new Date(query["endDate"]);
    result = {
      ...result,
      createdAt: { $gte: startDate, $lte: endDate },
    };
  } else if (query["startDate"] && query["startDate"] != "") {
    const startDate = new Date(query["startDate"]);
    result = {
      ...result,
      createdAt: { $gte: startDate },
    };
  } else if (query["endDate"] && query["endDate"] != "") {
    const endDate = new Date(query["endDate"]);
    result = {
      ...result,
      createdAt: { $lte: endDate },
    };
  }
  return result;
}
// export function buildQuery(query: any) {
//   /**
//    * {
//    *   { "title": /<keyword>/i },
//    *   { "title": /<keyword>/i },
//    *   { "createdAt": { $gte: "<startDate>", $lte: "<endDate>" } },
//    *
//    * }
//    */
//   let result = "{ ";
//   //   const allowedQuery = ["keyword", "limit", "startDate", "endDate"];

//   if (query["keyword"] && query["keyword"] != "") {
//     result += ` "title" : "/${query["keyword"]}/i" ,`;
//     result += ` "body" : "/${query["keyword"]}/i" ,`;
//   }
//   if (
//     query["startDate"] &&
//     query["endDate"] &&
//     query["startDate"] != "" &&
//     query["endDate"] != ""
//   ) {
//     const startDate = new Date(query["startDate"]);
//     const endDate = new Date(query["endDate"]);
//     result += ` "createdAt" : {"$gte": "${startDate}", "$lte": "${endDate}"} ,`;
//   } else if (query["startDate"] && query["startDate"] != "") {
//     const startDate = new Date(query["startDate"]);
//     result += ` "createdAt" : {"$gte": "${startDate}"} ,`;
//   } else if (query["endDate"] && query["endDate"] != "") {
//     const endDate = new Date(query["endDate"]);
//     result += ` "createdAt" : {"$gte": "${endDate}"} ,`;
//   }
//   result = result.slice(0, -1);
//   result += " }";
//   return result;
// }
