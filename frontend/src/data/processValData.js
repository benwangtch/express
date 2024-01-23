export const processValData = (userAddress) => {
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
    unitPrice: userAddress.price_pin,
    address: userAddress.addr,
    houseAge: userAddress.house_age,
    mainBuildingArea: userAddress["主建物面積"],
    floorAreaRatio: userAddress.far,
    landTransferArea: userAddress["土地移轉總面積(坪)"],
    buildingTransferArea: userAddress["建物移轉總面積(坪)"],
    populationDensity: userAddress.population_density,
    totalFloors: userAddress.total_floor,
    parkingArea: userAddress["車位移轉總面積(坪)"],
    n_c_1000: userAddress.n_c_1000,
  };

  const apartmentData = {
    unitPrice: userAddress.price_pin,
    address: userAddress.addr,
    floorAreaRatio: userAddress.far,
    houseAge: userAddress.house_age,
    landTransferArea: userAddress["土地移轉總面積(坪)"],
    buildingTransferArea: userAddress["建物移轉總面積(坪)"],
    totalFloors: userAddress.total_floor,
    parkingArea: userAddress["車位移轉總面積(坪)"],
    populationDensity: userAddress.population_density,
    mainBuildingArea: userAddress["主建物面積"],
    n_c_1000: userAddress.n_c_1000,
  };

  const houseData = {
    unitPrice: userAddress.price_pin,
    address: userAddress.addr,
    houseAge: userAddress.house_age,
    totalFloors: userAddress.total_floor,
    parkingArea: userAddress["車位移轉總面積(坪)"],
    floorAreaRatio: userAddress.far,
    landTransferArea: userAddress["土地移轉總面積(坪)"],
    buildingTransferArea: userAddress["建物移轉總面積(坪)"],
    populationDensity: userAddress.population_density,
    mainBuildingArea: userAddress["主建物面積"],
    n_c_1000: userAddress.n_c_1000,
  };

  const header =
    userAddress.type === "building"
      ? Object.values(buildingHeader)
      : userAddress.type === "apartment"
      ? Object.values(apartmentHeader)
      : Object.values(houseHeader);

  const data =
    userAddress.type === "building"
      ? Object.values(buildingData)
      : userAddress.type === "apartment"
      ? Object.values(apartmentData)
      : Object.values(houseData);

  return { header, data };
};
