import Avatar from 'avataaars';
const Avataars = () => {
    function randomInt(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
       
    }
    const mouth = ['Smile','Twinkle', 'Tongue', 'Default'];
    const tops = ['Hijab', 'Turban', 'WinterHat1', 'LongHairBigHair', 'LongHairBob', 'LongHairCurly', 'LongHairCurvy', 'LongHairDreads', 'LongHairFrida', 'LongHairFro', 'LongHairFroBand', 'LongHairNotTooLong', 'LongHairMiaWallace', 'LongHairStraight', 'LongHairStraight2', 'LongHairStraightStrand', 'ShortHairDreads01', 'ShortHairDreads02', 'ShortHairFrizzle', 'ShortHairShaggyMullet', 'ShortHairShortCurly', 'ShortHairShortFlat', 'ShortHairShortRound', 'ShortHairShortWaved', 'ShortHairTheCaesar']
    const skins = ['Tanned', 'Pale', 'Light']
    const bgColors=["#FE6798","#FEB367","#FEFF67","#99FF67","#6799FF","	#4e0865","#30fa0c","#fb0b98","#04f7ff","#E5A3B0","#EC7D34","#B487F9",'#FE91BA',"#FED95D","#F5845A"];
    const clothColor=["Blue02","Blue03","Gray01","Gray02","Heather","PastelGreen","PastelOrange","PastelRed","PastelYellow","Pink","Red"];
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ display: 'inline-block', backgroundColor:`${bgColors[randomInt(0,14)]}`, borderRadius: "10px", padding: "3px",height:"70px",width:"70px"}}>
            <Avatar
                style={{ width: '60px', height: '60px' ,margin:"auto"}}
                avatarStyle='Transparent'
                topType={tops[randomInt(0,24)]}
                accessoriesType='Blank'
                hairColor='Brown'
                facialHairType='Blank'
                clotheType='Hoodie'
                clotheColor={clothColor[randomInt(0,10)]}
                eyeType='Default'
                eyebrowType='Default'
                mouthType={mouth[randomInt(0,3)]}
                skinColor={skins[randomInt(0,2)]} />
        </div>


    );
}
export default Avataars; 