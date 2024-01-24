export const processSimiData = (user, similar) => {
  const buildingHeader = [
    "Unit Price",
    "Address",
    "House Age",
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
    "Unit Price",
    "Address",
    "House Age",
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
    "Unit Price",
    "Address",
    "Floor Area Ratio",
    "House Age",
    "Land Transfer Area",
    "Building Transfer Area",
    "Total Floor",
    "Parking Area",
    "Population Density",
    "Main Building Area",
    "n_c_1000",
  ];

  const buildingData = similar.map((item) => ({
    unitPrice: item.price_pin,
    address: item.addr,
    houseAge: item.house_age,
    mainBuildingArea: item["主建物面積"],
    floorAreaRatio: item.far,
    landTransferArea: item["土地移轉總面積(坪)"],
    buildingTransferArea: item["建物移轉總面積(坪)"],
    populationDensity: item.population_density,
    totalFloors: item.total_floor,
    parkingArea: item["車位移轉總面積(坪)"],
    n_c_1000: item.n_c_1000,
  }));

  const apartmentData = similar.map((item) => ({
    unitPrice: item.price_pin,
    address: item.addr,
    houseAge: item.house_age,
    totalFloors: item.total_floor,
    parkingArea: item["車位移轉總面積(坪)"],
    floorAreaRatio: item.far,
    landTransferArea: item["土地移轉總面積(坪)"],
    buildingTransferArea: item["建物移轉總面積(坪)"],
    populationDensity: item.population_density,
    mainBuildingArea: item["主建物面積"],
    n_c_1000: item.n_c_1000,
  }));

  const houseData = similar.map((item) => ({
    unitPrice: item.price_pin,
    address: item.addr,
    floorAreaRatio: item.far,
    houseAge: item.house_age,
    landTransferArea: item["土地移轉總面積(坪)"],
    buildingTransferArea: item["建物移轉總面積(坪)"],
    totalFloors: item.total_floor,
    parkingArea: item["車位移轉總面積(坪)"],
    populationDensity: item.population_density,
    mainBuildingArea: item["主建物面積"],
    n_c_1000: item.n_c_1000,
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
