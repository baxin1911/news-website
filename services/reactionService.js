let reactions = [];

export const toggleReactionWithOpposite = async (reactionDto) => {

    const { isActive, delta } = await toggleReaction(reactionDto);
    let oppositeDelta = 0;

    if (isActive) {

        const oppositeType = reactionDto.reactionType === 'like' ? 'dislike' : 'like';

        oppositeDelta = await deleteReaction({
            ...reactionDto,
            reactionType: oppositeType
        });
    }

    return { delta, oppositeDelta, isActive };
}

const toggleReaction = async (reactionDto) => {

    const existsEntity = await existsReaction(reactionDto);

    if (existsEntity) {

        const delta = await deleteReaction(reactionDto);

        return { isActive: false, delta };
    }

    const delta = await saveReaction(reactionDto);

    return { isActive: true, delta };
}

const saveReaction = async (reactionDto) => {

    reactionDto.id = crypto.randomUUID();
    const before = reactions.length;
    reactions.push(reactionDto);

    if (reactions.length > before) return 1;

    return 0;
}

const deleteReaction = async (reactionDto) => {

    const before = reactions.length;
    reactions = reactions.filter(reaction => !(
        reaction.entityType === reactionDto.entityType && 
        reaction.entityId === reactionDto.entityId &&
        reaction.userId === reactionDto.userId &&
        reaction.reactionType === reactionDto.reactionType
    ));

    if (reactions.length < before) return -1;

    return 0;
}

export const existsReaction = async (reactionDto) => {

    return reactions.some(reaction => 
        reaction.entityType === reactionDto.entityType && 
        reaction.entityId === reactionDto.entityId &&
        reaction.userId === reactionDto.userId &&
        reaction.reactionType === reactionDto.reactionType
    );
}

export const countReactionTotal = async (reactionDto) => {

    return reactions.filter(reaction =>
        reaction.entityType === reactionDto.entityType && 
        reaction.entityId === reactionDto.entityId &&
        reaction.reactionType === reactionDto.reactionType
    ).length;
}