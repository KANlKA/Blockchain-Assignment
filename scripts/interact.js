const hre = require("hardhat");

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.attach(contractAddress);

  console.log("Contract connected at:", votingSystem.address);

  const candidateCount = await votingSystem.candidates.length;
  console.log(`Available Candidates:`);
  for (let i = 0; i < candidateCount; i++) {
    const candidate = await votingSystem.candidates(i);
    console.log(`${i}: ${candidate.name} - Votes: ${candidate.voteCount}`);
  }
  const [signer] = await hre.ethers.getSigners();
  console.log(`Casting vote for candidate 0 by ${signer.address}...`);
  const tx = await votingSystem.vote(0);
  await tx.wait();
  console.log(`Vote casted successfully! ✅`);
  const winner = await votingSystem.getWinner();
  console.log(`Current winner: 🏆 ${winner}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});