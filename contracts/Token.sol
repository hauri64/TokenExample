pragma solidity ^0.4.18;



/**
 * @title SimpleToken
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `StandardToken` functions.
 */
contract Token {

  string public constant name = "Your Name"; 
  string public constant symbol = "TKN"; 
  uint8 public constant decimals = 3; 


  event Approval(address indexed owner, address indexed spender, uint256 value);
  event Transfer(address indexed from, address indexed to, uint256 value);

  function mint(address _to, uint256 _amount) public returns (bool) {
    balances[_to] = balances[_to]+_amount;
    totalSupply_ = totalSupply_ + _amount;
    return true;
  }

  mapping(address => uint256) balances;

  uint256 totalSupply_;

 
  function totalSupply() public view returns (uint256) {
    return totalSupply_;
  }
  
  function transfer(address _to, uint256 _value) public returns (bool) {
    require(_value <= balances[msg.sender]);
   
    balances[msg.sender] = balances[msg.sender]-_value;
    balances[_to] = balances[_to]+_value;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  function balanceOf(address _owner) public view returns (uint256 balance) {
    return balances[_owner];
  }

  mapping (address => mapping (address => uint256)) internal allowed;

  function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
    require(_value <= balances[_from]);
    require(_value <= allowed[_from][msg.sender]);
   
    balances[_from] = balances[_from] - _value;
    balances[_to] = balances[_to]+_value;
    allowed[_from][msg.sender] = allowed[_from][msg.sender] - _value;

    emit Transfer(_from, _to, _value);
    return true;
  }

  function approve(address _spender, uint256 _value) public returns (bool) {
    require((_value == 0) || (allowed[msg.sender][_spender] == 0));
    allowed[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, allowed[msg.sender][_spender]);
    return true;
  }

  function allowance(address _owner, address _spender) public view returns (uint256) {
    return allowed[_owner][_spender];
  }

}
