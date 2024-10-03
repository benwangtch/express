export const processSimiData = (user, similar) => {
  const buildingHeader = [
    "Unit Price / m\u00B2",
    "Address",
    "House Age (Year)",
    "Main Building Area",
    "Floor Area Ratio",
    "Land Transfer Area",
    "Building Transfer Area",
    "Population Density",
    "Total Floor",
    "Parking Area",
    "n_c_1000",
  ];

  const apartmentHeader = [
    "Unit Price / m\u00B2",
    "Address",
    "House Age (Year)",
    "Total Floor",
    "Parking Area",
    "Floor Area Ratio",
    "Land Transfer Area",
    "Building Transfer Area",
    "Population Density",
    "Main Building Area",
    "n_c_1000",
  ];

  const houseHeader = [
    "Unit Price / m\u00B2",
    "Address",
    "Floor Area Ratio",
    "House Age (Year)",
    "Land Transfer Area",
    "Building Transfer Area",
    "Total Floor",
    "Parking Area",
    "Population Density",
    "Main Building Area",
    "n_c_1000",
  ];

  const formatNumber = (value) => {
    const number = parseFloat(value);
    return !isNaN(number) ? +number.toFixed(2) : value;
  };

  const buildingData = similar.map((item) => ({
    unitPrice: formatNumber(item.price_pin),
    address: item.addr,
    houseAge: formatNumber(item.house_age),
    mainBuildingArea: formatNumber(item["主建物面積"]),
    floorAreaRatio: formatNumber(item.far),
    landTransferArea: formatNumber(item["土地移轉總面積(坪)"]),
    buildingTransferArea: formatNumber(item["建物移轉總面積(坪)"]),
    populationDensity: formatNumber(item.population_density),
    totalFloors: formatNumber(item.total_floor),
    parkingArea: formatNumber(item["車位移轉總面積(坪)"]),
    n_c_1000: formatNumber(item.n_c_1000),
  }));

  const apartmentData = similar.map((item) => ({
    unitPrice: formatNumber(item.price_pin),
    address: item.addr,
    houseAge: formatNumber(item.house_age),
    totalFloors: formatNumber(item.total_floor),
    parkingArea: formatNumber(item["車位移轉總面積(坪)"]),
    floorAreaRatio: formatNumber(item.far),
    landTransferArea: formatNumber(item["土地移轉總面積(坪)"]),
    buildingTransferArea: formatNumber(item["建物移轉總面積(坪)"]),
    populationDensity: formatNumber(item.population_density),
    mainBuildingArea: formatNumber(item["主建物面積"]),
    n_c_1000: formatNumber(item.n_c_1000),
  }));

  const houseData = similar.map((item) => ({
    unitPrice: formatNumber(item.price_pin),
    address: item.addr,
    floorAreaRatio: formatNumber(item.far),
    houseAge: formatNumber(item.house_age),
    landTransferArea: formatNumber(item["土地移轉總面積(坪)"]),
    buildingTransferArea: formatNumber(item["建物移轉總面積(坪)"]),
    totalFloors: formatNumber(item.total_floor),
    parkingArea: formatNumber(item["車位移轉總面積(坪)"]),
    populationDensity: formatNumber(item.population_density),
    mainBuildingArea: formatNumber(item["主建物面積"]),
    n_c_1000: formatNumber(item.n_c_1000),
  }));

  const header =
    user.type === "building"
      ? Object.values(buildingHeader)
      : user.type === "apartment"
      ? Object.values(apartmentHeader)
      : Object.values(houseHeader);

  const data =
    user.type === "building"
      ? Object.values(buildingData)
      : user.type === "apartment"
      ? Object.values(apartmentData)
      : Object.values(houseData);

  return { header, data };
};
