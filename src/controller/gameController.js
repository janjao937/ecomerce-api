const prismaClient = require("../orm/prismaClient");
// routes path:"/game"
//==prisma==
// id Int @id @default(autoincrement())
// updatedAt DateTime @updatedAt
// heightScore Int
// customerId String
// customer Customer @relation(fields: [customerId],references: [id],onDelete: Cascade)

//"/create"
const CreateGameData = async(req,res,next) =>{
    try{
        const score = req.body.score;//"score" from front
        const customerId = req.user.id;

        const newPlayer = await prismaClient.game.create({
            data:{
                heightScore:score,
                customerId:customerId
            },
            include:{
                customer:{
                    select:{
                        name:true
                    } 
                }
            }
        });

        console.log(newPlayer);
        res.status(201).json({message:"create new player",newPlayer});

    }
    catch(error){
        next(error);
    }
    
}
//"/update"
//patch
const UpdateGameData = async(req,res,next) =>{
    try{
        const score = req.body.score;//"score" from front
        const customerId = req.user.id;

        const player = await prismaClient.game.findFirst({
            where:{
                customerId:customerId
            }
        });
        if(!player){
            next(CreateGameData(req,res,next));//create if invalid
        }

        if(score<=player.heightScore){
            return res.status(400).json({message:"its not height score"});
        }

        const updateScore = await prismaClient.game.update({
            data:{
                heightScore:score
            }
        });
        console.log(updateScore);
        res.status(200).json({message:"update height score"});
    }
    catch(error){
        next(error);
    }
}
//"/leaderboard"
//get
const GetLeaderboardData = async(req,res,next) =>{
    try{
        const leaderboardData = await prismaClient.game.findMany({
            include:{
                customer:{
                    select:{
                        name:true
                    }
                }
            },
            orderBy:{
                score:"desc",
            },
            take:5
        
        });
        console.log(leaderboardData);
        res.status(200).json({leaderboardData});//res:leaderboardData

    }
    catch(error){
        next(error);
    }
}

exports.CreateGameData = CreateGameData;
exports.UpdateGameData = UpdateGameData;
exports.GetLeaderboardData = GetLeaderboardData;
