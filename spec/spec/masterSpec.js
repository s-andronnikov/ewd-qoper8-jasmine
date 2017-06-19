describe("Master", function() {
    // init environment
    const qoper8 = require('ewd-qoper8');
    jasmine.clock().install();

    describe("VERSION", function () {
        var master;
        beforeEach(function() {
            master = new qoper8.masterProcess();
            master.log = false;
            master.shutdownDelay = 1;
        });

        it ("should be not empty string", function () {
            var version = master.version();
            expect(version).toBeNonEmptyString();
        });
    });

    describe("QUEUE", function () {
        var master;
        beforeEach(function() {
            master = new qoper8.masterProcess();
            master.log = false;
            master.shutdownDelay = 1;
        });

        afterEach(function () {
            //
        });

        it ("should have control methods", function () {
            var spy1 = spyOn(master, 'start');
            expect(master.start).toBeDefined();
            master.start();
            expect(spy1).toHaveBeenCalled();

            var spy2 = spyOn(master, 'stop');
            expect(master.stop).toBeDefined();
            master.stop();
            expect(spy2).toHaveBeenCalled();
        }, 300);

        it ("Should invoke 'start' and 'started' event", function () {
            var spy = spyOn(master, "emit");
            master.start();
            expect(spy).toHaveBeenCalledWith("start");
            expect(spy).toHaveBeenCalledWith("started");
            jasmine.clock().tick(100);

            setTimeout(function() {
                master.stop();
            }, 100);
        }, 300);

        it ("Should be possible to add messages to queue", function() {
            master.on('started', function () {
                var messageObj = {
                    type: 'testMessage1',
                    hello: 'world'
                };
                this.addToQueue(messageObj);

                messageObj = {
                    type: 'testMessage2',
                    hello: 'another world'
                };
                this.addToQueue(messageObj);
            });
            master.start();

            expect(master).toHaveNonEmptyArray('queue');
            expect(master.queue).toBeArrayOfSize(2);

            setTimeout(function () {
                master.stop();
            }, 100);
        }, 300);


    });


    // xdescribe("WORKER", function () {
    //     it ("should have process id", function () {
    //         console.log(master.process());
    //         expect(master.process)
    //             .toBeNumber()
    //             .toBeGreaterThan(0);
        //
        // })
    //
    //
    // });
    //
    //
    /** @todo */
    // describe('upTime', function () {
    //     it('', function () {
    //
    //     });
    // })
});
