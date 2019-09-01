


/**
 * @title SimpleToken
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `StandardToken` functions.
 */
contract Token {

  string public constant name = "my token"; 
  string public constant symbol = "TKN"; 
  uint8 public constant decimals = 18; 
  mapping(address => uint256) balances;
  mapping (address => mapping (address => uint256)) internal allowed;

  uint256 totalSupply_;

  event Approval(address indexed owner, address indexed spender, uint256 value);
  event Transfer(address indexed from, address indexed to, uint256 value);

  function mint(address _to, uint256 _amount) public returns (bool) { }
 
  function totalSupply() public view returns (uint256) { }
  
  function transfer(address _to, uint256 _value) public returns (bool) { }

  function balanceOf(address _owner) public view returns (uint256 balance) { }

 
  function transferFrom(address _from, address _to, uint256 _value) public returns (bool) { }

  function approve(address _spender, uint256 _value) public returns (bool) { }

  function allowance(address _owner, address _spender) public view returns (uint256) { }

}
