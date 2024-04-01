import mongodb from 'mongodb';

const { ObjectId } = mongodb;

let reviews;

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return;
        }
        try {
            reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews');
        } catch (e) {
            console.error(`Unable to establish connection handle in reviewDAO: ${e}`);
        }
    }

    static async addReview(movieId, user, review, date) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                review: review,
                movie_id: new ObjectId(movieId) // Correct usage: Use ObjectId as a constructor
            };
            return await reviews.insertOne(reviewDoc);
        } catch (e) {
            console.error(`Unable to post review: ${e}`);
            return { error: e };
        }
    }

    static async updateReview(reviewId, userId, review, date) {
        try {
            const updateResponse = await reviews.updateOne(
                { user_id: userId, _id: new ObjectId(reviewId) }, // Correct usage: Use ObjectId as a constructor
                { $set: { review: review, date: date } }
            );
            return updateResponse;
        } catch (e) {
            console.error(`Unable to update review ${e}`);
            return { error: e };
        }
    }

    static async deleteReview(reviewId, userId) {
        try {
            const deleteResponse = await reviews.deleteOne(
                { _id: new ObjectId(reviewId), user_id: userId } // Correct usage: Use ObjectId as a constructor
            );
            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete review ${e}`);
            return { error: e };
        }
    }
}
