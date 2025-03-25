const hre = require("hardhat");

async function main() {
  const candidateNames = ["Bablu", "Kanu", "Aasu"];
  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");

  const votingSystem = await VotingSystem.deploy(candidateNames);
  await votingSystem.deployed();

  console.log(`deployed at address: ${votingSystem.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});