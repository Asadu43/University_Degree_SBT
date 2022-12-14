import { expect } from "chai";
import { Contract, BigNumber, Signer } from "ethers";
import hre, { ethers } from "hardhat";

describe("ABT Token", function () {
  let signers: Signer[];

  let testTokenInstance: Contract;

  let user: any;
  let user2: any;

  before(async () => {
    signers = await ethers.getSigners();

    hre.tracer.nameTags[await signers[0].getAddress()] = "ADMIN";
    hre.tracer.nameTags[await signers[1].getAddress()] = "USER1";

    user = signers[1];
    user2 = signers[2];

    const UniversityDegree = await ethers.getContractFactory("UniversityDegree", signers[0]);
    testTokenInstance = await UniversityDegree.deploy();
  });

  it("Issue Degree", async function () {
    await testTokenInstance.connect(signers[0]).issueDegree(user.address);
    await testTokenInstance.connect(signers[0]).issueDegree(user2.address);
  });

  it("Claim Degree", async function () {
    await testTokenInstance.connect(signers[0]).issueDegree(user.address);
    await testTokenInstance.connect(user).claimDegree("Asad");
    await testTokenInstance.connect(user2).claimDegree("Ali");
  });
});
