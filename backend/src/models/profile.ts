import { db } from '../index'

export async function Profile (profile: any): Promise<boolean>{

    try{
        if (profile.gender){
            db.run(`UPDATE user_profile\
            SET gender = (?)\
            WHERE user_email = (?)`,
            profile.gender, profile.email)
        }

        if (profile.preference){
            db.run(`UPDATE user_profile\
            SET preference = (?)\
            WHERE user_email = (?)`,
            profile.preference, profile.email)
        }
        if (profile.age){
            db.run(`UPDATE user_profile\
            SET age = (?)\
            WHERE user_email = (?)`,
            profile.age, profile.email)
        }
        
        if (profile.bio){
            db.run(`UPDATE user_profile\
            SET bio = (?)\
            WHERE user_email = (?)`,
            profile.bio, profile.email)
        }
        
        if (profile.picture_1){
            db.run(`UPDATE user_profile\
            SET picture_1 = (?)\
            WHERE user_email = (?)`,
            profile.picture_1, profile.email)
        }

        if (profile.picture_2){
            db.run(`UPDATE user_profile\
            SET picture_2 = (?)\
            WHERE user_email = (?)`,
            profile.picture_2, profile.email)
        }

        if (profile.picture_3){
            db.run(`UPDATE user_profile\
            SET picture_3 = (?)\
            WHERE user_email = (?)`,
            profile.picture_3, profile.email)
        }

        if (profile.picture_4){
            db.run(`UPDATE user_profile\
            SET picture_4 = (?)\
            WHERE user_email = (?)`,
            profile.picture_4, profile.email)
        }

        if (profile.picture_5){
            db.run(`UPDATE user_profile\
            SET picture_5 = (?)\
            WHERE user_email = (?)`,
            profile.picture_5, profile.email)
        }

        if (profile.location){
            db.run(`UPDATE user_profile\
            SET location = (?)\
            WHERE user_email = (?)`,
            profile.location, profile.email)
        }

        if (profile.smoking){
            db.run(`UPDATE user_profile\
            SET smoking = (?)\
            WHERE user_email = (?)`,
            profile.smoking, profile.email)
        }

        if (profile.drinking){
            db.run(`UPDATE user_profile\
            SET drinking = (?)\
            WHERE user_email = (?)`,
            profile.drinking, profile.email)
        }
        if (profile.religion){
            db.run(`UPDATE user_profile\
            SET religion = (?)\
            WHERE user_email = (?)`,
            profile.religion, profile.email)
        }
        if (profile.pets){
            db.run(`UPDATE user_profile\
            SET pets = (?)\
            WHERE user_email = (?)`,
            profile.drinking, profile.email)
        }
        return true
    } catch(error){
        return false
    }
}