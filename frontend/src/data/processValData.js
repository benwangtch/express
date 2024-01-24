export const processValData = (user) => {
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

  const buildingData = {
    unitPrice: user.price_pin,
    address: user.addr,
    houseAge: user.house_age,
    mainBuildingArea: user["主建物面積"],
    floorAreaRatio: user.far,
    landTransferArea: user["土地移轉總面積(坪)"],
    buildingTransferArea: user["建物移轉總面積(坪)"],
    populationDensity: user.population_density,
    totalFloors: user.total_floor,
    parkingArea: user["車位移轉總面積(坪)"],
    n_c_1000: user.n_c_1000,
  };

  const apartmentData = {
    unitPrice: user.price_pin,
    address: user.addr,
    floorAreaRatio: user.far,
    houseAge: user.house_age,
    landTransferArea: user["土地移轉總面積(坪)"],
    buildingTransferArea: user["建物移轉總面積(坪)"],
    totalFloors: user.total_floor,
    parkingArea: user["車位移轉總面積(坪)"],
    populationDensity: user.population_density,
    mainBuildingArea: user["主建物面積"],
    n_c_1000: user.n_c_1000,
  };

  const houseData = {
    unitPrice: user.price_pin,
    address: user.addr,
    houseAge: user.house_age,
    totalFloors: user.total_floor,
    parkingArea: user["車位移轉總面積(坪)"],
    floorAreaRatio: user.far,
    landTransferArea: user["土地移轉總面積(坪)"],
    buildingTransferArea: user["建物移轉總面積(坪)"],
    populationDensity: user.population_density,
    mainBuildingArea: user["主建物面積"],
    n_c_1000: user.n_c_1000,
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
