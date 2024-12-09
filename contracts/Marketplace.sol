// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    address public owner;
    uint public productCount;
    
    struct Product {
        uint id;
        string name;
        string description;
        uint price;
        bool isSold;
    }

    mapping(uint => Product) public products;

    event ProductListed(
        uint id,
        string name,
        uint price
    );

    constructor() {
        owner = msg.sender;
        productCount = 0;
    }

    function listProduct(string memory _name, string memory _description, uint _price) public {
        productCount++;
        products[productCount] = Product(productCount, _name, _description, _price, false);
        emit ProductListed(productCount, _name, _price);
    }

    function buyProduct(uint _id) public payable {
        Product storage product = products[_id];

        require(msg.value == product.price, "Incorrect value sent.");
        require(!product.isSold, "Product already sold.");

        product.isSold = true;
    }
}
