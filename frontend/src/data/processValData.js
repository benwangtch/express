export const processValData = (user) => {
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

  const buildingData = {
    unitPrice: formatNumber(user.price_pin),
    address: user.addr,
    houseAge: formatNumber(user.house_age),
    mainBuildingArea: formatNumber(user["主建物面積"]),
    floorAreaRatio: formatNumber(user.far),
    landTransferArea: formatNumber(user["土地移轉總面積(坪)"]),
    buildingTransferArea: formatNumber(user["建物移轉總面積(坪)"]),
    populationDensity: formatNumber(user.population_density),
    totalFloors: formatNumber(user.total_floor),
    parkingArea: formatNumber(user["車位移轉總面積(坪)"]),
    n_c_1000: formatNumber(user.n_c_1000),
  };

  const apartmentData = {
    unitPrice: formatNumber(user.price_pin),
    address: user.addr,
    houseAge: formatNumber(user.house_age),
    totalFloors: formatNumber(user.total_floor),
    parkingArea: formatNumber(user["車位移轉總面積(坪)"]),
    floorAreaRatio: formatNumber(user.far),
    landTransferArea: formatNumber(user["土地移轉總面積(坪)"]),
    buildingTransferArea: formatNumber(user["建物移轉總面積(坪)"]),
    populationDensity: formatNumber(user.population_density),
    mainBuildingArea: formatNumber(user["主建物面積"]),
    n_c_1000: formatNumber(user.n_c_1000),
  };

  const houseData = {
    unitPrice: formatNumber(user.price_pin),
    address: user.addr,
    floorAreaRatio: formatNumber(user.far),
    houseAge: formatNumber(user.house_age),
    landTransferArea: formatNumber(user["土地移轉總面積(坪)"]),
    buildingTransferArea: formatNumber(user["建物移轉總面積(坪)"]),
    totalFloors: formatNumber(user.total_floor),
    parkingArea: formatNumber(user["車位移轉總面積(坪)"]),
    populationDensity: formatNumber(user.population_density),
    mainBuildingArea: formatNumber(user["主建物面積"]),
    n_c_1000: formatNumber(user.n_c_1000),
  };

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
