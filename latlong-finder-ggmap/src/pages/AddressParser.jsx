// import React, { useState } from "react";
// import "./css/address.css";
// import * as XLSX from "xlsx";
// import { Link } from "react-router-dom";
// const AddressParser = () => {
//   const [addresses, setAddresses] = useState("");
//   const [parsedAddresses, setParsedAddresses] = useState([]);
//   const exportToExcel = () => {
//     if (parsedAddresses.length > 0) {
//       const ws = XLSX.utils.json_to_sheet(parsedAddresses);
//       const wb = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(wb, ws, "Parsed Addresses");
//       XLSX.writeFile(wb, "parsed_addresses.xlsx");
//     }
//   };
//   const parseAddresses = () => {
//     const addressesArray = addresses.split("\n");
//     const parsedResults = [];

//     addressesArray.forEach((address, index) => {
//       const components = address.split(", ");

//       let column1 = [];
//       let column2 = [];
//       let column3 = [];
//       let column4 = [];
//       let column5 = [];
//       let column6 = [];
//       let column7 = [];
//       let column8 = [];
//       let street = [];

//       components.forEach((component) => {
//         if (
//           component.includes("Phường") ||
//           component.includes("Xã") ||
//           component.includes("Thị trấn")
//         ) {
//           column1.push(component);
//         } else if (
//           component.includes("Quận") ||
//           component.includes("Huyện") ||
//           component.includes("Thị xã") ||
//           component.includes("Thành phố")
//         ) {
//           if (
//             component.includes("Thành phố Hồ Chí Minh") ||
//             component.includes("Thành phố Hà Nội") ||
//             component.includes("Thành phố Hải Phòng") ||
//             component.includes("Thành phố Cần Thơ") ||
//             component.includes("Thành phố Đà Nẵng")
//           ) {
//             column3.push(component);
//           } else {
//             column2.push(component);
//           }
//         } else if (component.includes("Tỉnh")) {
//           column3.push(component);
//         } else if (
//           component.includes("Khu phố") ||
//           component.includes("thôn") ||
//           component.includes("Ấp")
//         ) {
//           column4.push(component);
//         } else if (
//           component.includes("tổ") ||
//           component.includes("Khóm") ||
//           component.includes("Xóm")
//         ) {
//           column5.push(component);
//         } else if (component.includes("Việt Nam")) {
//           column6.push(component);
//         } else if (
//           component.includes("Cụm dân cư") ||
//           component.includes("Chung cư") ||
//           component.includes("Ngõ") ||
//           component.includes("Hẻm")
//         ) {
//           column7.push(component);
//         } else if (
//           component.includes("Toà nhà") ||
//           component.includes("Khối nhà") ||
//           component.includes("Ngách") ||
//           component.includes("Kiệt")
//         ) {
//           column8.push(component);
//         } else if (
//           component.includes("Đường") ||
//           component.includes("dg") ||
//           component.includes("Bưu điện") ||
//           component.includes("Công ty") ||
//           component.includes("Bưu điện huyện") ||
//           component.includes("Bưu điện tỉnh") ||
//           component.includes("Trường học") ||
//           component.includes("ký túc xá") ||
//           component.includes("Kho") ||
//           component.includes("Ki ốt") ||
//           component.includes("Chùa") ||
//           component.includes("văn miếu") ||
//           component.includes("vòng xoay") ||
//           component.includes("sn") ||
//           component.includes("Số") ||
//           component.includes("Số nhà")
//         ) {
//           street.push(component);
//         }
//       });

//       column1 = [...new Set(column1)];
//       column2 = [...new Set(column2)];
//       column3 = [...new Set(column3)];
//       column4 = [...new Set(column4)];
//       column5 = [...new Set(column5)];
//       column6 = [...new Set(column6)];
//       column7 = [...new Set(column7)];
//       column8 = [...new Set(column8)];

//       const parsed = {
//         column1: column1.join(", "),
//         column2: column2.join(", "),
//         column3: column3.join(", "),
//         column4: column4.join(", "),
//         column5: column5.join(", "),
//         column6: column6.join(", "),
//         column7: column7.join(", "),
//         column8: column8.join(", "),
//         street: street.join(", "),
//       };

//       parsedResults.push(parsed);
//     });

//     setParsedAddresses(parsedResults);
//   };

//   return (
//     <div className="main">
//       <Link className="main" to={"/"}>
//         Home
//       </Link>
//       <textarea
//         rows="10"
//         cols="30"
//         placeholder="Nhập địa chỉ (mỗi địa chỉ cách nhau bởi dấu xuống dòng)"
//         value={addresses}
//         onChange={(e) => setAddresses(e.target.value)}
//         className="input"
//       />
//       <button onClick={parseAddresses}>Tách địa chỉ</button>

//       <div className="result">
//         {parsedAddresses.map((parsedAddress, index) => (
//           <div key={index} className="address">
//             <div className="column">
//               <h3>(Phường/Xã/Thị trấn):</h3>
//               <p>{parsedAddress.column1}</p>
//             </div>
//             <div className="column">
//               <h3>(Quận/Huyện/Tp/TX):</h3>
//               <p>{parsedAddress.column2}</p>
//             </div>
//             <div className="column">
//               <h3>(Tỉnh/Thành phố):</h3>
//               <p>{parsedAddress.column3}</p>
//             </div>
//             <div className="column">
//               <h3>(Khu phố/Thôn/Ấp):</h3>
//               <p>{parsedAddress.column4}</p>
//             </div>
//             <div className="column">
//               <h3>(Tổ Dân phố/Khóm/Xóm):</h3>
//               <p>{parsedAddress.column5}</p>
//             </div>
//             <div className="column">
//               <h3>Cụm dc/Chung cư/Ngõ-Hẻm:</h3>
//               <p>{parsedAddress.column6}</p>
//             </div>
//             <div className="column">
//               <h3>Toà nhà/Khối nhà/Ngách-Kiệt:</h3>
//               <p>{parsedAddress.column6}</p>
//             </div>
//             <div className="column">
//               <h3>Country:</h3>
//               <p>{parsedAddress.column6}</p>
//             </div>
//             <div className="column">
//               <h3>Số nhà/Đường:</h3>
//               <p>{parsedAddress.street}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       <button onClick={exportToExcel}>Xuất ra Excel</button>
//     </div>
//   );
// };

// export default AddressParser;

// adadada
// import React, { useState } from "react";
// import "./css/address.css";
// import * as XLSX from "xlsx";
// import { Link } from "react-router-dom";

// const AddressParser = () => {
//   const [addresses, setAddresses] = useState("");
//   const [parsedAddresses, setParsedAddresses] = useState([]);

//   const exportToExcel = () => {
//     if (parsedAddresses.length > 0) {
//       const ws = XLSX.utils.json_to_sheet(parsedAddresses);
//       const wb = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(wb, ws, "Parsed Addresses");
//       XLSX.writeFile(wb, "parsed_addresses.xlsx");
//     }
//   };

//   const parseAddresses = () => {
//     const addressesArray = addresses.split("\n");
//     const parsedResults = [];

//     addressesArray.forEach((address, index) => {
//       const components = address.split(", ");
//       const columns = Array.from({ length: 8 }, () => []);
//       let street = [];

//       components.forEach((component) => {
//         const lowerComponent = component.toLowerCase();

//         if (
//           ["Phường", "Xã", "Thị trấn"].some((keyword) =>
//             lowerComponent.includes(keyword)
//           )
//         ) {
//           columns[0].push(component);
//         } else if (
//           ["Quận", "Huyện", "Thị xã", "Thành phố"].some((keyword) =>
//             lowerComponent.includes(keyword)
//           )
//         ) {
//           if (
//             [
//               "thành phố hồ chí minh",
//               "thành phố hà nội",
//               "thành phố hải phòng",
//               "thành phố cần thơ",
//               "thành phố đà nẵng",
//             ].some((city) => lowerComponent.includes(city))
//           ) {
//             columns[2].push(component);
//           } else {
//             columns[1].push(component);
//           }
//         } else if (lowerComponent.includes("tỉnh")) {
//           columns[2].push(component);
//         } else if (
//           ["Khu phố", "Thôn", "Ấp"].some((keyword) =>
//             lowerComponent.includes(keyword)
//           )
//         ) {
//           columns[3].push(component);
//         } else if (
//           ["Tổ", "Khóm", "Xóm"].some((keyword) =>
//             lowerComponent.includes(keyword)
//           )
//         ) {
//           columns[4].push(component);
//         } else if (lowerComponent.includes("việt nam")) {
//           columns[5].push(component);
//         } else if (
//           [
//             "Cụm dân cư",
//             "Chung cư",
//             "Ngõ",
//             "Hẻm",
//             "Toà nhà",
//             "Khối nhà",
//             "Ngách",
//             "Kiệt",
//           ].some((keyword) => lowerComponent.includes(keyword))
//         ) {
//           columns[6].push(component);
//         } else if (
//           [
//             "Đường",
//             "dg",
//             "Bưu điện",
//             "Công ty",
//             "Bưu điện huyện",
//             "Bưu điện tỉnh",
//             "Trường học",
//             "ký túc xá",
//             "Kho",
//             "Ki ốt",
//             "Chùa",
//             "văn miếu",
//             "vòng xoay",
//             "sn",
//             "Số",
//             "Số nhà",
//           ].some((keyword) => lowerComponent.includes(keyword))
//         ) {
//           street.push(component);
//         }
//       });

//       columns.forEach((column) => {
//         column = [...new Set(column)];
//       });

//       const parsed = {
//         column1: columns[0].join(", "),
//         column2: columns[1].join(", "),
//         column3: columns[2].join(", "),
//         column4: columns[3].join(", "),
//         column5: columns[4].join(", "),
//         column6: columns[5].join(", "),
//         column7: columns[6].join(", "),
//         column8: columns[7].join(", "),
//         street: street.join(", "),
//       };

//       parsedResults.push(parsed);
//     });

//     setParsedAddresses(parsedResults);
//   };

//   return (
//     <div className="main">
//       <Link className="main" to={"/"}>
//         Home
//       </Link>
//       <textarea
//         rows="10"
//         cols="30"
//         placeholder="Nhập địa chỉ (mỗi địa chỉ cách nhau bởi dấu xuống dòng)"
//         value={addresses}
//         onChange={(e) => setAddresses(e.target.value)}
//         className="input"
//       />
//       <button onClick={parseAddresses}>Tách địa chỉ</button>
//       <div className="result">
//         {parsedAddresses.map((parsedAddress, index) => (
//           <div key={index} className="address">
//             {Array.from({ length: 8 }, (_, i) => (
//               <div className="column" key={i}>
//                 <h3>({i < 3 ? "Phường/Xã/Thị trấn" : "Quận/Huyện/Tp/TX"}):</h3>
//                 <p>{parsedAddress[`column${i + 1}`]}</p>
//               </div>
//             ))}
//             <div className="column">
//               <h3>Country:</h3>
//               <p>{parsedAddress.column6}</p>
//             </div>
//             <div className="column">
//               <h3>Số nhà/Đường:</h3>
//               <p>{parsedAddress.street}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       <button onClick={exportToExcel}>Xuất ra Excel</button>
//     </div>
//   );
// };

// export default AddressParser;
import React, { useState } from "react";
import "./css/address.css";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";

const AddressParser = () => {
  const [addresses, setAddresses] = useState("");
  const [parsedAddresses, setParsedAddresses] = useState([]);
  const addKeywords = (component) => {
    const keywords = [
      "thôn",
      "Ấp",
      "tổ",
      "Khóm",
      "Xóm",
      "Cụm",
      "Chung cư",
      "Ngõ",
      "hẻm",
      "Toà nhà",
      "Khối nhà",
      "Ngách",
      "Kiệt",
      "Đường",
      "dg",
      "Bưu điện",
      "Công ty",
      "Bưu điện huyện",
      "Bưu điện tỉnh",
      "Trường học",
      "ký túc xá",
      "Kho",
      "Ki ốt",
      "Chùa",
      "văn miếu",
      "vòng xoay",
      "Sn",
      "Số",
      "Số nhà",
      "Trường",
    ];

    let modifiedComponent = component;

    keywords.forEach((keyword) => {
      modifiedComponent = modifiedComponent.replace(
        new RegExp(`\\b${keyword}\\b`, "gi"),
        `, ${keyword}`
      );
    });

    return modifiedComponent;
  };
  const exportToExcel = () => {
    if (parsedAddresses.length > 0) {
      const ws = XLSX.utils.json_to_sheet(parsedAddresses);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Parsed Addresses");
      XLSX.writeFile(wb, "parsed_addresses.xlsx");
    }
  };

  const parseAddresses = () => {
    const addressesArray = addresses.split("\n");
    const parsedResults = [];

    addressesArray.forEach((address) => {
      const components = address.split(", ");
      const parsed = {
        "Thành phố/Tỉnh": "",
        "Quận/Huyện/Thành phố/Thị xã": "",
        "Phường/Xã/Thị trấn": "",
        "Khu phố/Thôn/Ấp": "",
        "Tổ Dân phố/Khóm/Xóm": "",
        "Cụm dân cư/Chung cư/Ngõ-hẻm": "",
        "Toà nhà/Khối nhà/Ngách-Kiệt": "",
        "Số nhà/Đường/Phố": "",
      };

      components.forEach((component) => {
        const lowerComponent = component.toLowerCase();

        if (
          lowerComponent.includes("thành phố hồ chí minh") ||
          lowerComponent.includes("thành phố hà nội") ||
          lowerComponent.includes("thành phố đà nẵng") ||
          lowerComponent.includes("thành phố hải phòng") ||
          lowerComponent.includes("thành phố cần thơ")
        ) {
          parsed["Thành phố/Tỉnh"] = component;
        } else if (
          lowerComponent.includes("quận") ||
          lowerComponent.includes("huyện") ||
          lowerComponent.includes("thị xã") ||
          lowerComponent.includes("thành phố")
        ) {
          parsed["Quận/Huyện/Thành phố/Thị xã"] = component;
        } else if (
          lowerComponent.includes("phường") ||
          lowerComponent.includes("xã") ||
          lowerComponent.includes("thị trấn")
        ) {
          parsed["Phường/Xã/Thị trấn"] = component;
        } else if (
          lowerComponent.includes("khu phố") ||
          lowerComponent.includes("thôn") ||
          lowerComponent.includes("ấp")
        ) {
          parsed["Khu phố/Thôn/Ấp"] = component;
        } else if (
          lowerComponent.includes("tổ") ||
          lowerComponent.includes("khóm") ||
          lowerComponent.includes("xóm") ||
          lowerComponent.includes("tổ")
        ) {
          parsed["Tổ Dân phố/Khóm/Xóm"] = component;
        } else if (
          lowerComponent.includes("cụm dân cư") ||
          lowerComponent.includes("chung cư") ||
          lowerComponent.includes("ngõ") ||
          lowerComponent.includes("hẻm") ||
          lowerComponent.includes("cụm")
        ) {
          parsed["Cụm dân cư/Chung cư/Ngõ-hẻm"] = component;
        } else if (
          lowerComponent.includes("toà nhà") ||
          lowerComponent.includes("khối nhà") ||
          lowerComponent.includes("ngách") ||
          lowerComponent.includes("kiệt") ||
          lowerComponent.includes("toà") ||
          lowerComponent.includes("khối")
        ) {
          parsed["Toà nhà/Khối nhà/Ngách-Kiệt"] = component;
        } else {
          parsed["Số nhà/Đường/Phố"] += addKeywords(component) + ", ";
        }
      });

      parsed["Số nhà/Đường/Phố"] = parsed["Số nhà/Đường/Phố"].replace(
        /, $/,
        ""
      );

      parsedResults.push(parsed);
    });

    setParsedAddresses(parsedResults);
  };
  return (
    <div className="main">
      <Link className="main" to={"/"}>
        Home
      </Link>
      <textarea
        rows="10"
        cols="30"
        placeholder="Nhập địa chỉ (mỗi địa chỉ cách nhau bởi dấu xuống dòng)"
        value={addresses}
        onChange={(e) => setAddresses(e.target.value)}
        className="input"
      />
      <button onClick={parseAddresses}>Tách địa chỉ</button>

      <div className="result">
        {parsedAddresses.map((parsedAddress, index) => (
          <div key={index} className="address">
            {Object.keys(parsedAddress).map((key, subIndex) => (
              <div className="column" key={subIndex}>
                <h3>{key}:</h3>
                <p>{parsedAddress[key]}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={exportToExcel}>Xuất ra Excel</button>
    </div>
  );
};
export default AddressParser;
