class Room {
    constructor(number, type, rate) {
        this.number = number;
        this.type = type;
        this.rate = rate; // Per night rate
        this.isAvailable = true;
    }

    getNumber() {
        return this.number;
    }

    getType() {
        return this.type;
    }

    getRate() {
        return this.rate;
    }

    checkAvailability() {
        return this.isAvailable;
    }

    setAvailability(status) {
        this.isAvailable = status;
    }
}

class Guest {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }
}

class Booking {
    constructor(id, guest, room, startDate, endDate) {
        this.id = id;
        this.guest = guest;
        this.room = room;
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.totalAmount = this.calculateTotal();
    }

    calculateTotal() {
        const nights = Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));
        return nights * this.room.getRate();
    }

    getId() {
        return this.id;
    }

    getGuest() {
        return this.guest;
    }

    getRoom() {
        return this.room;
    }

    getStartDate() {
        return this.startDate;
    }

    getEndDate() {
        return this.endDate;
    }

    getTotalAmount() {
        return this.totalAmount;
    }
}

class Hotel {
    constructor() {
        this.rooms = [];
        this.guests = [];
        this.bookings = [];
    }

    addRoom(room) {
        this.rooms.push(room);
        console.log(`Room added: ${room.getNumber()} (${room.getType()})`);
    }

    addGuest(guest) {
        this.guests.push(guest);
        console.log(`Guest added: ${guest.getName()}`);
    }

    createBooking(guestId, roomNumber, startDate, endDate) {
        const guest = this.guests.find(g => g.getId() === guestId);
        const room = this.rooms.find(r => r.getNumber() === roomNumber);

        if (!guest) {
            throw new Error(`Guest with ID ${guestId} not found.`);
        }
        if (!room) {
            throw new Error(`Room with number ${roomNumber} not found.`);
        }
        if (!room.checkAvailability()) {
            throw new Error(`Room ${roomNumber} is not available.`);
        }

        const booking = new Booking(this.bookings.length + 1, guest, room, startDate, endDate);
        room.setAvailability(false); // Room is now booked
        this.bookings.push(booking);
        console.log(`Booking created: ${booking.getId()}`);
        return booking;
    }

    cancelBooking(bookingId) {
        const booking = this.bookings.find(b => b.getId() === bookingId);
        if (!booking) {
            throw new Error(`Booking with ID ${bookingId} not found.`);
        }

        booking.getRoom().setAvailability(true); // Room is now available
        this.bookings = this.bookings.filter(b => b.getId() !== bookingId);
        console.log(`Booking cancelled: ${bookingId}`);
    }

    AvailableRooms() {
        console.log("Available rooms:");
        this.rooms.forEach(room => {
            if (room.checkAvailability()) {
                console.log(`Room ${room.getNumber()} (${room.getType()}), Rate: $${room.getRate()}`);
            }
        });
    }

    GuestInfo() {
        console.log("Guests:");
        this.guests.forEach(guest => {
            console.log(`ID: ${guest.getId()}, Name: ${guest.getName()}, Email: ${guest.getEmail()}`);
        });
    }

    BookingInfo() {
        console.log("Bookings:");
        this.bookings.forEach(booking => {
            console.log(`Booking ID: ${booking.getId()}, Guest: ${booking.getGuest().getName()}, Room: ${booking.getRoom().getNumber()}, Total Amount: $${booking.getTotalAmount()}`);
        });
    }
}

(function main() {
    const hotel = new Hotel();

    // Add rooms and guests
    hotel.addRoom(new Room(101, "Single", 100));
    hotel.addRoom(new Room(102, "Double", 150));
    hotel.addRoom(new Room(103, "Suite", 250));

    hotel.addGuest(new Guest(1, "John Doe", "john.doe@example.com"));
    hotel.addGuest(new Guest(2, "Jane Smith", "jane.smith@example.com"));

    // Create and cancel bookings
    try {
        const booking1 = hotel.createBooking(1, 101, "2024-09-01", "2024-09-07");
        const booking2 = hotel.createBooking(2, 102, "2024-09-05", "2024-09-10");

        // Attempt to book an unavailable room
        try {
            hotel.createBooking(1, 101, "2024-09-08", "2024-09-15");
        } catch (e) {
            console.log(e.message);
        }

        // Cancel a booking
        hotel.cancelBooking(booking1.getId());

    } catch (e) {
        console.log(e.message);
    }

    // Print current state
    hotel.AvailableRooms();
    hotel.GuestInfo();
    hotel.BookingInfo();
})();
