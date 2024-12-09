// Import Hardhat's ethers module once
const { ethers } = require("hardhat");

async function main() {
  // Get the signers
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Get the contract factory (Marketplace contract in this case)
  const Marketplace = await ethers.getContractFactory("Marketplace");

  // Deploy the contract
  const marketplace = await Marketplace.deploy();
  console.log("Marketplace contract deployed to:", marketplace.address);
}

// Run the deployment script
main()
  .then(() => process.exit(0)) // Exit with success
  .catch((error) => {
    // Handle errors
    console.error(error);
    process.exit(1); // Exit with failure
  });
