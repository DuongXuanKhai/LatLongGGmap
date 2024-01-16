import React, { useState } from "react";
import * as XLSX from "xlsx";
const AddressParser = () => {
  const [addresses, setAddresses] = useState("");
  const [parsedAddresses, setParsedAddresses] = useState([]);
  const exportToExcel = () => {
    if (parsedAddresses.length > 0) {
      const ws = XLSX.utils.json_to_sheet(parsedAddresses);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Parsed Addresses");
      XLSX.writeFile(wb, "parsed_addresses.xlsx");
    }
  };
  const splitAddressByKeywords = (address) => {
    const keywords = [
      "thôn",
      "Ấp",
      "ấp",
      "tổ",
      "Tổ",
      "tô",
      "tổ dân phố",
      "Khóm",
      "Xóm",
      "Khu",
      "Cụm",
      "Chung cư",
      "chung cư",
      "chung",
      "Ngõ",
      "hẻm",
      "Toà nhà",
      "Khối nhà",
      "thành",
      "tp",
      "Ngách",
      "ngách",
      "Kiệt",
      "Đường",
      "dg",
      "Bưu điện",
      "Công ty",
      "Bưu điện huyện",
      "Bưu điện tỉnh",
      "Trường học",
      "ký túc xá",
      "lô",
      "block",
      "tháp",
      "cao ốc",
      "ký túc xá",
      "căn hộ",
      "căn",
      "ki ốt",
      "ki-ốt",
      "kios",
      "kiot",
      "Kho",
      "Ki ốt",
      "Chùa",
      "văn miếu",
      "vòng xoay",
      "Sn",
      "Số",
      "Số nhà",
      "Trường",
      "Park",
      "Sảnh",
      "chợ",
      "phường",
      "quận",
      "thành phố",
      "tỉnh",
      "huyện",
      "thị trấn",
      "thị xã",
      "xã",
      "cty",
      "ct",
      "toà",
      "căn",
      "tòa",
      "cc",
      "Tỉnh",
      "tdp",
      "khối",
      "kđt",
      "khu đô thị",
      "kbt",
      "khu biệt thự",
      "ap",
      "nhà trọ",
      "nhà",
      "nha",
      // Thêm các keyword khác
    ];
    const splitAddress = (address) => {
      let modifiedAddress = address;
      keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "gi");
        modifiedAddress = modifiedAddress.replace(regex, `,${keyword}`);
      });
      return modifiedAddress;
    };
    return splitAddress(address);
  };
  const parseAddress = (address) => {
    const components = address.split(",");

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
        lowerComponent.includes("thành phố cần thơ") ||
        lowerComponent.includes("tỉnh") ||
        lowerComponent.includes("Tỉnh")
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
        lowerComponent.includes("ấp") ||
        lowerComponent.includes("ap") ||
        lowerComponent.includes("khu")
      ) {
        parsed["Khu phố/Thôn/Ấp"] = component;
      } else if (
        lowerComponent.includes("khóm") ||
        lowerComponent.includes("tổ") ||
        lowerComponent.includes("xóm") ||
        lowerComponent.includes("tổ dân phố") ||
        lowerComponent.includes("tdp")
      ) {
        parsed["Tổ Dân phố/Khóm/Xóm"] = component;
      } else if (
        lowerComponent.includes("cụm dân cư") ||
        lowerComponent.includes("chung cư") ||
        lowerComponent.includes("chung") ||
        lowerComponent.includes("ngõ") ||
        lowerComponent.includes("hẻm") ||
        lowerComponent.includes("cụm") ||
        lowerComponent.includes("kcn") ||
        lowerComponent.includes("cc") ||
        lowerComponent.includes("kđt") ||
        lowerComponent.includes("khu đô thị") ||
        lowerComponent.includes("khu công nghiệp") ||
        lowerComponent.includes("khu biệt thự") ||
        lowerComponent.includes("nhà") ||
        lowerComponent.includes("nha") ||
        lowerComponent.includes("nhà trọ") ||
        lowerComponent.includes("kbt")
      ) {
        parsed["Cụm dân cư/Chung cư/Ngõ-hẻm"] = component;
      } else if (
        lowerComponent.includes("toà nhà") ||
        lowerComponent.includes("khối nhà") ||
        lowerComponent.includes("ngách") ||
        lowerComponent.includes("kiệt") ||
        lowerComponent.includes("toà") ||
        lowerComponent.includes("khối") ||
        lowerComponent.includes("căn hộ") ||
        lowerComponent.includes("căn") ||
        lowerComponent.includes("tòa")
      ) {
        parsed["Toà nhà/Khối nhà/Ngách-Kiệt"] = component;
      } else {
        parsed["Số nhà/Đường/Phố"] += component + " ";
      }
    });
    parsed["Số nhà/Đường/Phố"] = parsed["Số nhà/Đường/Phố"].replace(/, $/, "");
    return parsed;
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const parseAddresses = () => {
    const addressesArray = addresses.split("\n");
    const parsedResults = [];

    addressesArray.forEach((address) => {
      const modifiedAddress = splitAddressByKeywords(address);
      const parsed = parseAddress(modifiedAddress);

      for (let key in parsed) {
        parsed[key] = parsed[key]
          .split(" ")
          .map((word) => capitalizeFirstLetter(word))
          .join(" ");
      }

      parsedResults.push(parsed);
    });

    setParsedAddresses(parsedResults);
  };

  return (
    <div className="main">
      <textarea
        rows="10"
        cols="30"
        placeholder="Nhập địa chỉ (mỗi địa chỉ cách nhau bởi dấu xuống dòng)"
        value={addresses}
        onChange={(e) => setAddresses(e.target.value)}
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
        <button onClick={exportToExcel}>Xuất ra Excel</button>
      </div>
    </div>
  );
};

export default AddressParser;
