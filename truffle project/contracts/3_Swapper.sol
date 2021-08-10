pragma solidity ^0.8.0;
pragma abicoder v2;
// SPDX-License-Identifier: GPL-2.0-or-later

import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';
import '@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol';
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./1_Campaign.sol";
import "./WETH9.sol";

contract SwapExamples {

    ISwapRouter public immutable swapRouter;


    // For this example, we will set the pool fee to 0.3%.
    uint24 public constant poolFee = 3000;
    address public constant DAI = 0xaD6D458402F60fD3Bd25163575031ACDce07538D;
    address public constant WETH10_addr = 0xF1acf4697EF35F0edD2Cf0BC352d4be94B6220f5;
    address public constant WETH9_addr = 0xc778417E063141139Fce010982780140Aa0cD5Ab;

    constructor(ISwapRouter _swapRouter) {
        swapRouter = _swapRouter;
    }
    fallback() external payable {}

    function swapExactInputSingle(uint256 amountIn, address _token, address payable _campaign, string memory _tokenURI, string memory _mail) external returns (uint256 amountOut) {
        // msg.sender must approve this contract
        TransferHelper.safeTransferFrom(_token, msg.sender, address(this), amountIn);
        if (_token != WETH9_addr){
            TransferHelper.safeApprove(_token, address(swapRouter), amountIn);

        // Naively set amountOutMinimum to 0. In production, use an oracle or other data source to choose a safer value for amountOutMinimum.
        // We also set the sqrtPriceLimitx96 to be 0 to ensure we swap our exact input amount.
        ISwapRouter.ExactInputSingleParams memory params =
            ISwapRouter.ExactInputSingleParams({
                tokenIn: _token,
                tokenOut: WETH9_addr,
                fee: poolFee,
                recipient: address(this),
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        // The call to `exactInputSingle` executes the swap.
        amountOut = swapRouter.exactInputSingle(params);
        }else{
            amountOut = amountIn;
        }
        
        IWETH weth = IWETH(WETH9_addr);
        weth.withdraw(amountOut);
        Campaign camp = Campaign(_campaign);
        camp.donate{value: amountOut}(_mail, _tokenURI);

        return amountOut;
    }

    function swapExactOutputSingle(uint256 amountOut, uint256 amountInMaximum, address payable _token) external returns (uint256 amountIn) {
        // Transfer the specified amount of DAI to this contract.
        TransferHelper.safeTransferFrom(_token, msg.sender, address(this), amountInMaximum);

        // Approve the router to spend the specifed `amountInMaximum` of DAI.
        // In production, you should choose the maximum amount to spend based on oracles or other data sources to acheive a better swap.
        TransferHelper.safeApprove(_token, address(swapRouter), amountInMaximum);

        ISwapRouter.ExactOutputSingleParams memory params =
            ISwapRouter.ExactOutputSingleParams({
                tokenIn: _token,
                tokenOut: WETH10_addr,
                fee: poolFee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountOut: amountOut,
                amountInMaximum: amountInMaximum,
                sqrtPriceLimitX96: 0
            });

        // Executes the swap returning the amountIn needed to spend to receive the desired amountOut.
        amountIn = swapRouter.exactOutputSingle(params);

        // For exact output swaps, the amountInMaximum may not have all been spent.
        // If the actual amount spent (amountIn) is less than the specified maximum amount, we must refund the msg.sender and approve the swapRouter to spend 0.
        if (amountIn < amountInMaximum) {
            TransferHelper.safeApprove(_token, address(swapRouter), 0);
            TransferHelper.safeTransfer(_token, msg.sender, amountInMaximum - amountIn);
        }
    }
}