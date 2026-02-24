const subscribers = [];

export const saveSubscriber = async (subscriberDto) => {
    subscribers.push(subscriberDto);

    return { id: subscriberDto.id };
}