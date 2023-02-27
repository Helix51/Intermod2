// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleWallet {
    mapping(address => uint) private _balances;

    function deposit() public payable {
        _balances[msg.sender] += msg.value;
    }

    function transfer(address recipient, uint amount) public {
        require(_balances[msg.sender] >= amount, "Insufficient balance");
        _balances[msg.sender] -= amount;
        _balances[recipient] += amount;
    }

    function balanceOf(address account) public view returns (uint) {
        return _balances[account];
    }
}
