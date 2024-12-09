const { expect } = require("chai");

describe("Marketplace", function () {
  it("Should allow users to list and buy products", async function () {
    const [seller, buyer] = await ethers.getSigners();
    const Marketplace = await ethers.getContractFactory("Marketplace");
    const marketplace = await Marketplace.deploy();
    await marketplace.deployed();

    // List a product
    await marketplace
      .connect(seller)
      .listProduct(
        "Test Product",
        "Description",
        ethers.utils.parseEther("1"),
        "image-url"
      );

    // Buy the product
    await marketplace
      .connect(buyer)
      .buyProduct(1, { value: ethers.utils.parseEther("1") });

    const purchases = await marketplace.getMyPurchases();
    expect(purchases.length).to.equal(1);
  });
});
