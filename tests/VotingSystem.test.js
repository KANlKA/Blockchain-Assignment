const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VotingSystem", function () {
  let VotingSystem, votingSystem, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const candidateNames = ["Alice", "Bob", "Charlie"];
    VotingSystem = await ethers.getContractFactory("VotingSystem");
    votingSystem = await VotingSystem.deploy(candidateNames);
    await votingSystem.deployed();
  });

  it("Should deploy with correct candidates", async function () {
    const candidate0 = await votingSystem.candidates(0);
    expect(candidate0.name).to.equal("Alice");
    expect(candidate0.voteCount).to.equal(0);

    const candidate1 = await votingSystem.candidates(1);
    expect(candidate1.name).to.equal("Bob");
    expect(candidate1.voteCount).to.equal(0);
  });

  it("Should allow a user to cast a vote", async function () {
    await votingSystem.connect(addr1).vote(1);
    const candidate = await votingSystem.candidates(1);
    expect(candidate.voteCount).to.equal(1);
  });

  it("Should not allow double voting", async function () {
    await votingSystem.connect(addr1).vote(0);
    await expect(votingSystem.connect(addr1).vote(0)).to.be.revertedWith(
      "You have already voted."
    );
  });

  it("Should return the correct winner", async function () {
    await votingSystem.connect(addr1).vote(0);
    await votingSystem.connect(addr2).vote(0);
    expect(await votingSystem.getWinner()).to.equal("Alice");
  });
});
