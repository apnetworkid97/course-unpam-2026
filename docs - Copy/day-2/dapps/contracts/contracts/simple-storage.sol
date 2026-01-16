// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {
    // owner contract
    address public owner;

    // nilai yang disimpan
    uint256 private storedValue;

    // event ownership
    event OwnerSet(address indexed oldOwner, address indexed newOwner);

    // event update value
    event ValueUpdated(uint256 oldValue, uint256 newValue);

    // modifier akses
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    // constructor (jalan saat deploy)
    constructor() {
        owner = msg.sender;
        emit OwnerSet(address(0), owner);
    }

    // simpan nilai ke blockchain (write)
    function setValue(uint256 _value) public onlyOwner {
        uint256 old = storedValue;
        storedValue = _value;
        emit ValueUpdated(old, _value);
    }

    // membaca nilai terakhir (read)
    function getValue() public view returns (uint256) {
        return storedValue;
    }
}
