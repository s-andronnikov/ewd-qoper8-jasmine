describe("Master", function() {
    // init environment
    const qoper8 = require('ewd-qoper8');
    var master = new qoper8.masterProcess();
    master.log = false;

    jasmine.clock().install();

    describe("VERSION", function () {
        it ("should be not empty string", function () {
            var version = master.version();
            expect(version).toBeNonEmptyString();
        });
    });

    describe("QUEUE", function () {
        it ("should have control methods", function () {
            var spy1 = spyOn(master, 'start');
            expect(master.start).toBeDefined();
            master.start();
            expect(spy1).toHaveBeenCalled();

            var spy2 = spyOn(master, 'stop');
            expect(master.stop).toBeDefined();
            master.stop();
            expect(spy2).toHaveBeenCalled();
        });


        it ("Should invoke 'start' and 'started' event", function () {
            var spy = spyOn(master, "emit");
            master.start();
            expect(spy).toHaveBeenCalledWith("start");
            expect(spy).toHaveBeenCalledWith("started");
            setTimeout(function() {
                master.stop();
            }, 100);
        }, 300);

        // it ("Should be possible to add messages to queue", function() {
        //     master.on('started', function () {
        //         var messageObj = {
        //             type: 'testMessage1',
        //             hello: 'world'
        //         };
        //         master.addToQueue(messageObj);
        //
        //         messageObj = {
        //             type: 'testMessage2',
        //             hello: 'another world'
        //         };
        //         master.addToQueue(messageObj);
        //     });
        //     master.start();
        //     // jasmine.clock().tick(50);
        //     // console.log('---', master.queue.length);
        //     setTimeout(function () {
        //         master.stop();
        //     }, 100);
        // }, 300);


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
